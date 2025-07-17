import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import AcceptModal from '../../components/addlist/AcceptModal';
import EateryHistoryBar from '../../components/mylist/history/EateryHistoryBar';
import type { EateryHistoryBarType } from '../../components/mylist/history/EateryHistoryBar';
import SearchBar from '../../components/common/SearchBar';
import SelectSortOptionModal from '../../components/mylist/history/SelectSortOptionModal';
import styles from './addListPage.module.css';
import { useState } from 'react';

const dummyData: EateryHistoryBarType[] = [
  {
    rating: 4.5,
    name: '삼겹살천국',
    address: '서울시 강남구 테헤란로 10',
    visitiedAt: new Date('2024-07-01'),
  },
  {
    rating: 3.8,
    name: '곱창의전설',
    address: '부산시 해운대구 달맞이길 5',
    visitiedAt: new Date('2024-06-22'),
  },
  {
    rating: 5.0,
    name: '스시사랑',
    address: '인천시 연수구 송도대로 120',
    visitiedAt: new Date('2024-06-15'),
  },
  {
    rating: 4.2,
    name: '왕짜장',
    address: '대구시 수성구 들안로 45',
    visitiedAt: new Date('2024-05-29'),
  },
  {
    rating: 3.5,
    name: '우동이야기',
    address: '광주시 서구 풍암로 77',
    visitiedAt: new Date('2024-05-20'),
  },
  {
    rating: 4.7,
    name: '브런치하우스',
    address: '제주시 중앙로 88',
    visitiedAt: new Date('2024-05-10'),
  },
  {
    rating: 2.9,
    name: '치킨마루',
    address: '서울시 노원구 상계로 30',
    visitiedAt: new Date('2024-04-18'),
  },
  {
    rating: 4.9,
    name: '소고기나라',
    address: '경기도 수원시 팔달구 정조로 100',
    visitiedAt: new Date('2024-04-01'),
  },
  {
    rating: 3.7,
    name: '분식타임',
    address: '울산시 남구 삼산로 12',
    visitiedAt: new Date('2024-03-25'),
  },
  {
    rating: 4.3,
    name: '냉면의정석',
    address: '대전시 유성구 대학로 200',
    visitiedAt: new Date('2024-03-10'),
  },
  {
    rating: 3.0,
    name: '비빔밥한상',
    address: '춘천시 공지로 88',
    visitiedAt: new Date('2024-02-28'),
  },
  {
    rating: 4.1,
    name: '피자앤버거',
    address: '서울시 종로구 종로 1가',
    visitiedAt: new Date('2024-02-15'),
  },
  {
    rating: 3.4,
    name: '중국집명가',
    address: '전주시 완산구 전주천동길 22',
    visitiedAt: new Date('2024-01-30'),
  },
  {
    rating: 4.8,
    name: '하와이안포케',
    address: '부산시 수영구 광안해변로 39',
    visitiedAt: new Date('2024-01-10'),
  },
  {
    rating: 2.5,
    name: '칼국수집',
    address: '경주시 원효로 101',
    visitiedAt: new Date('2023-12-20'),
  },
  {
    rating: 3.9,
    name: '감자탕장인',
    address: '청주시 상당구 상당로 55',
    visitiedAt: new Date('2023-12-01'),
  },
  {
    rating: 4.4,
    name: '떡볶이연구소',
    address: '수원시 영통구 이의동 123',
    visitiedAt: new Date('2023-11-15'),
  },
  {
    rating: 3.2,
    name: '명동김밥',
    address: '서울시 중구 명동8가길 2',
    visitiedAt: new Date('2023-10-30'),
  },
  {
    rating: 4.6,
    name: '소바마을',
    address: '강릉시 경강로 156',
    visitiedAt: new Date('2023-10-10'),
  },
  {
    rating: 3.6,
    name: '스테이크팩토리',
    address: '성남시 분당구 정자동 178',
    visitiedAt: new Date('2023-09-22'),
  },
];

function AddListPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isAddModalOn, setIsAddModalOn] = useState<boolean>(false);
  const [isOptionModalOn, setIsOptionModalOn] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<'latest' | 'rating'>('latest');
  const location = useLocation();
  const rank = location.state.rank;
  const [selectedValue, setSelectedValue] = useState<{
    name: string;
    address: string;
  }>({
    name: '',
    address: '',
  });
  const [selectedPage, setSelectdPage] = useState(1);
  const mappginSortOption = (option: string) => {
    if (option === 'latest') return '최신순';
    if (option === 'rating') return '별점순';
  };
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
        {dummyData.map((ele) => (
          <EateryHistoryBar
            {...ele}
            onClick={() => {
              setIsAddModalOn(true);
              setSelectedValue({ name: ele.name, address: ele.address });
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
        <ChevronLeft size={25} />
        <div
          className={`${styles.pageNumber} ${
            selectedPage === 1 ? styles.selected : ''
          }`}
          onClick={() => setSelectdPage(1)}
        >
          1
        </div>
        <div
          className={`${styles.pageNumber} ${
            selectedPage === 2 ? styles.selected : ''
          }`}
          onClick={() => setSelectdPage(2)}
        >
          2
        </div>
        <div
          className={`${styles.pageNumber} ${
            selectedPage === 3 ? styles.selected : ''
          }`}
          onClick={() => setSelectdPage(3)}
        >
          3
        </div>
        <div
          className={`${styles.pageNumber} ${
            selectedPage === 4 ? styles.selected : ''
          }`}
          onClick={() => setSelectdPage(4)}
        >
          4
        </div>
        <div
          className={`${styles.pageNumber} ${
            selectedPage === 5 ? styles.selected : ''
          }`}
          onClick={() => setSelectdPage(5)}
        >
          5
        </div>

        <ChevronRight size={25} />
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
