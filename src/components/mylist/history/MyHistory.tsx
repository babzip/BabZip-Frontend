import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import EateryHistoryBar from './EateryHistoryBar';
import type { EateryHistoryBarType } from './EateryHistoryBar';
import SearchBar from '../../common/SearchBar';
import SelectSortOptionModal from './SelectSortOptionModal';
import axios from 'axios';
import styles from './myhistory.module.css';

const MyHistory = () => {
  const [allData, setAllData] = useState<EateryHistoryBarType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isOptionModalOn, setIsOptionModalOn] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<'latest' | 'rating'>('latest');
  const [selectedPage, setSelectdPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const accessToken = localStorage.getItem('accessToken');

  const mappingSortQuery = (option: string) => {
    if (option === 'latest') return 'createdAt,DESC';
    if (option === 'rating') return 'rating,DESC';
  };
  const mappginSortOption = (option: string) => {
    if (option === 'latest') return '최신순';
    if (option === 'rating') return '별점순';
  };

  const getAllDate = async () => {
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
    getAllDate();
  }, [selectedPage, sortOption]);

  return (
    <div className={styles.container}>
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
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <div className={styles.barBox}>
        {allData.map((ele) => (
          <EateryHistoryBar
            key={ele.kakaoPlaceId}
            onClick={() => {}}
            {...ele}
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
    </div>
  );
};

export default MyHistory;
