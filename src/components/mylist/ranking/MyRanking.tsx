import { useEffect, useState } from 'react';

import DeleteModal from '../../addlist/DeleteModal';
import { Pencil } from 'lucide-react';
import RankingBar from './RankIngBar';
import styles from './myranking.module.css';

export interface RankingDataType {
  rank: number;
  eateryName: string | null;
  address: string | null;
}

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
  { rank: 7, eateryName: null, address: null },
  { rank: 8, eateryName: '곱창의신', address: '광주시 북구 하남대로 87' },
  { rank: 9, eateryName: '떡볶이연구소', address: '수원시 영통구 대학로 17' },
  { rank: 10, eateryName: '칼국수본점', address: '청주시 상당구 상당로 101' },
];

type Props = {
  addData?: { name: string; address: string; rank: number };
};

const MyRanking = ({ addData }: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [rankData, setRankData] = useState<RankingDataType[]>(dummyRankData);
  const [isDeleteModalOn, setIsDeleteModalOn] = useState<boolean>(false);
  const [selected, setSelected] = useState<RankingDataType>(rankData[0]);

  useEffect(() => {
    if (addData?.rank && addData.name && addData.address) {
      setRankData((prev) =>
        prev.map((item) =>
          item.rank === addData.rank
            ? {
                ...item,
                eateryName: addData.name,
                address: addData.address,
              }
            : item
        )
      );
    }
    console.log(rankData);
  }, [addData]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>TOP 10</span>
      </div>
      <div className={styles.datas}>
        {rankData.map((data) => (
          <RankingBar
            {...data}
            isEditMode={isEditMode}
            onClick={
              isEditMode
                ? () => {
                    setIsDeleteModalOn(true);
                    setSelected(data);
                  }
                : () => {}
            }
          />
        ))}
      </div>
      <div className={styles.editIcon} onClick={() => setIsEditMode(true)}>
        <Pencil size={25} color='#7D7AFF' fill='white' />
      </div>
      <div className={styles.btnBox}>
        {isEditMode ? (
          <button
            className={styles.doneBtn}
            onClick={() => setIsEditMode(false)}
          >
            완료
          </button>
        ) : (
          ''
        )}
      </div>
      <div className={styles.modal}>
        {isDeleteModalOn && (
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => setIsDeleteModalOn(false)}
            />
            <div className={styles.modal}>
              <DeleteModal
                name={selected.eateryName ?? ''}
                rank={selected.rank}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyRanking;
