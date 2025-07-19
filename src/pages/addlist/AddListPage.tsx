import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AcceptModal from '../../components/addlist/AcceptModal';
import EateryHistoryBar from '../../components/mylist/history/EateryHistoryBar';
import type { EateryHistoryBarType } from '../../components/mylist/history/EateryHistoryBar';
import SearchBar from '../../components/common/SearchBar';
import SelectSortOptionModal from '../../components/mylist/history/SelectSortOptionModal';
import axios from 'axios';
import styles from './addListPage.module.css';

function AddListPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isAddModalOn, setIsAddModalOn] = useState<boolean>(false);
  const [isOptionModalOn, setIsOptionModalOn] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<'latest' | 'rating'>('latest');
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const rank = location.state.rankValue;
  const [allData, setAllData] = useState<EateryHistoryBarType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<{
    name: string;
    address: string;
  }>({
    name: '',
    address: '',
  });
  const [selectedPage, setSelectdPage] = useState(1);

  const mappingSortQuery = (option: string) => {
    if (option === 'latest') return 'createdAt,DESC';
    if (option === 'rating') return 'rating,DESC';
  };

  const mappginSortOption = (option: string) => {
    if (option === 'latest') return '최신순';
    if (option === 'rating') return '별점순';
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `https://babzip.duckdns.org/guestbook/me?page=${
          selectedPage - 1
        }&sort=${mappingSortQuery(sortOption)}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log('[방명록 데이터 Get] ', response.data);
      setAllData(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log('rank:', rank);
  }, []);

  useEffect(() => {
    getAllData();
  }, [selectedPage, sortOption]);

  return (
    <div className={styles.container}>
      <div className={styles.cancelBtn} onClick={() => navigate(-1)}>
        <button>추가하기 취소</button>
      </div>
      <div className={styles.topBar}>
        <div className={styles.title}>내 기록</div>
        <div
          className={styles.sortingBox}
          onClick={() => setIsOptionModalOn(true)}
        >
          <div>{mappginSortOption(sortOption)}</div>
          <ChevronDown />
        </div>
      </div>
      <SearchBar
        value={searchValue}
        placeholder='식당명을 입력해보세요.'
        onChange={() => setSearchValue}
      />
      <div className={styles.barBox}>
        {allData.map((ele) => (
          <EateryHistoryBar
            {...ele}
            onClick={() => {
              setIsAddModalOn(true);
              setSelectedValue({
                name: ele.restaurantName,
                address: ele.address,
              });
            }}
          />
        ))}
      </div>
      <div className={styles.modalArea}>
        {isOptionModalOn && (
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => setIsOptionModalOn(false)}
            />
            <div className={styles.modalArea}>
              <SelectSortOptionModal
                selected={sortOption}
                onChange={(option) => {
                  setSortOption(option);
                  setIsOptionModalOn(false);
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.pageBar}>
        <ChevronLeft
          size={25}
          onClick={() => setSelectdPage((prev) => Math.max(prev - 1, 1))}
        />

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <div
            key={page}
            className={`${styles.pageNumber} ${
              selectedPage === page ? styles.selected : ''
            }`}
            onClick={() => setSelectdPage(page)}
          >
            {page}
          </div>
        ))}

        <ChevronRight
          size={25}
          onClick={() =>
            setSelectdPage((prev) => Math.min(prev + 1, totalPages))
          }
        />
      </div>
      <div className={styles.modal}>
        {isAddModalOn && (
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => setIsAddModalOn(false)}
            />
            <div className={styles.modal}>
              <AcceptModal
                onCancel={() => setIsAddModalOn(false)}
                name={selectedValue.name}
                address={selectedValue.address}
                rank={rank}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddListPage;
