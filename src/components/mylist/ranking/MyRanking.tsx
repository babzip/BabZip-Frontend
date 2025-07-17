import RankingBar from './RankIngBar';
import styles from './myranking.module.css';

export type RankingDataType = {
  rank: number;
  eateryName: string;
  address: string;
};

const dummyRankData: RankingDataType[] = [
  { rank: 1, eateryName: '맛있는집', address: '서울시 강남구 강남대로 1길' },
  { rank: 2, eateryName: '고기천국', address: '부산시 해운대구 해운대로 20' },
  { rank: 3, eateryName: '스시명가', address: '인천시 연수구 센트럴로 33' },
  { rank: 4, eateryName: '냉면전문점', address: '대전시 서구 둔산대로 55' },
  { rank: 5, eateryName: '김밥천국', address: '서울시 종로구 종로3가길 8' },
  {
    rank: 6,
    eateryName: '브런치타임',
    address: '제주시 구좌읍 해맞이해안로 123',
  },
  { rank: 7, eateryName: '치킨마스터', address: '대구시 수성구 달구벌대로 45' },
  { rank: 8, eateryName: '곱창의신', address: '광주시 북구 하남대로 87' },
  { rank: 9, eateryName: '떡볶이연구소', address: '수원시 영통구 대학로 17' },
  { rank: 10, eateryName: '칼국수본점', address: '청주시 상당구 상당로 101' },
];

const MyRanking = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>TOP 10</span>
      </div>
      <div className={styles.datas}>
        {dummyRankData.map((data) => (
          <RankingBar {...data} />
        ))}
      </div>
    </div>
  );
};

export default MyRanking;
