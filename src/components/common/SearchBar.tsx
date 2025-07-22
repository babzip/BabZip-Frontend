import { useState, type ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import styles from './searchBar.module.css';
import { useLocationStore } from '../../store/useLocationStore';
import VisitedEatery from '../eatery/VisitedEatery';
import ReviewPage from '../../pages/review/ReviewPage';
import { useMapStore } from '../../store/useMapStore';

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

interface searchResultType {
  place_name: string;
  place_url: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

const initialSelectedData: searchResultType = {
  place_name: '',
  place_url: '',
  category_name: '',
  distance: '',
  id: '',
  phone: '',
  address_name: '',
  road_address_name: '',
  x: '',
  y: '',
};

const SearchBar = ({ value, placeholder, onChange }: Props) => {
  const apiUrl = import.meta.env.API_URL;
  const [searchResult, setSearchResult] = useState<searchResultType[]>([]);
  const [selectedData, setSelectedData] =
    useState<searchResultType>(initialSelectedData);
  const [visited, setVisited] = useState<boolean>(false);
  const { setCenter, setMarker } = useMapStore();
  const { lat, lng } = useLocationStore();
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [resultOn, setResultOn] = useState<boolean>(false);
  const [isWriteModalOn, setIsWriteModalOn] = useState<boolean>(false);
  const [isModifyModalOn, setIsModifyModalOn] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<{
    restaurantName: string;
    address: string;
    content: string;
    rating: number;
    createdAt: Date;
  }>();
  const accessToken = localStorage.getItem('accessToken');

  const searchVisited = async (query: string) => {
    try {
      const response = await axios.get(`${apiUrl}/guestbook/search/${query}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data.data);
      if (response.data.data.content.length == 0) {
        return false;
      }
      if (response.data.data.content.length != 0) {
        setPostInfo(response.data.data.content[0]);
        console.log('[postinfo] ', postInfo);
        return true;
      }
    } catch (err) {
      console.error('[검색 도중 에러 발생] : ', err);
      return false;
    }
  };

  const handleSearch = async (val: string, x: number, y: number) => {
    const body = {
      query: val,
      x: x,
      y: y,
      page: 1,
    };
    try {
      const response = await axios.post(`${apiUrl}/search`, body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('[요청결과] : ', response.data.data.documents);
      setSearchResult(response.data.data.documents);
      setResultOn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectData = async (ele: searchResultType) => {
    setSelectedData(ele);
    const isVisited = await searchVisited(ele.place_name);
    setVisited(isVisited ?? false);
    setCenter(+ele.y, +ele.x);
    setMarker(+ele.y, +ele.x);
    setResultOn(false);
    setIsModalOn(true);
  };

  const deleteData = async (ele: searchResultType) => {
    const kakaoPlaceId = ele.id;
    try {
      const response = await axios.delete(
        `${apiUrl}/guestbook/${kakaoPlaceId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type='text'
          value={value}
          className={styles.input}
          placeholder={placeholder}
          onChange={onChange}
        />
        <Search onClick={() => handleSearch(value, lng, lat)} color='#7d7aff' />
      </div>
      <div className={styles.searchResult}>
        {resultOn &&
          (searchResult.length > 0 ? (
            searchResult.map((ele) => (
              <div
                key={ele.id}
                className={styles.element}
                onClick={() => handleSelectData(ele)}
              >
                {ele.place_name}
                <span className={styles.subAddress}>{ele.address_name}</span>
              </div>
            ))
          ) : (
            <div className={styles.element}>검색 결과가 없습니다.</div>
          ))}
      </div>
      <div className={styles.modal}>
        {isModalOn && (
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => {
                setIsModalOn(false);
                setMarker(null);
                setCenter(lat, lng);
              }}
            />
            <div className={styles.modal}>
              <VisitedEatery
                shareUrl={selectedData.place_url}
                onModifyClicked={() => {
                  setIsModalOn(false);
                  setIsModifyModalOn(true);
                }}
                onAddClicked={() => {
                  setIsModalOn(false);
                  setIsWriteModalOn(true);
                }}
                onDeleteClicked={() => {
                  deleteData(selectedData);
                  setIsModalOn(false);
                }}
                location={selectedData.address_name}
                visited={visited}
                restaurentName={selectedData.place_name}
                rating={postInfo?.rating ?? 0}
                visitedDate={new Date()}
                textContent={postInfo?.content ?? ''}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.writeModal}>
        {isWriteModalOn && (
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => {
                setIsWriteModalOn(false);
                setMarker(null);
                setCenter(lat, lng);
              }}
            />
            <div className={styles.writeModal}>
              <ReviewPage
                closeModal={() => {
                  setIsWriteModalOn(false);
                  setMarker(null);
                  setCenter(lat, lng);
                }}
                onReviewSubmitted={() => {
                  useMapStore.getState().addMarker({
                    id: selectedData.id,
                    lat: +selectedData.y,
                    lng: +selectedData.x,
                  });
                }}
                address={selectedData.address_name}
                kakaoPlaceId={selectedData.id}
                name={selectedData.place_name}
                visitedDate={new Date()}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.modifyModal}>
        {isModifyModalOn ? (
          <ReviewPage
            initialContent={postInfo?.content}
            initialRating={postInfo?.rating}
            closeModal={() => {
              setIsModifyModalOn(false);
              setMarker(null);
              setCenter(lat, lng);
            }}
            address={postInfo?.address ?? ''}
            kakaoPlaceId={selectedData.id}
            name={postInfo?.restaurantName ?? ''}
            visitedDate={new Date(postInfo?.createdAt ?? new Date())}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SearchBar;
