import { useEffect, useState } from 'react';

import DeleteModal from '../../addlist/DeleteModal';
import { Pencil } from 'lucide-react';
import RankingBar from './RankIngBar';
import axios from 'axios';
import styles from './myranking.module.css';

export interface RankingDataType {
  rankValue: number;
  restaurantName: string | null;
  address: string | null;
}

type Props = {
  addData?: { name: string; address: string; rank: number };
};

const MyRanking = ({ addData }: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [rankData, setRankData] = useState<RankingDataType[]>();
  const [isDeleteModalOn, setIsDeleteModalOn] = useState<boolean>(false);
  const [selected, setSelected] = useState<RankingDataType>({
    rankValue: 0,
    restaurantName: '',
    address: '',
  });
  const accessToken = localStorage.getItem('accessToken');

  const getTop10Data = async () => {
    try {
      const response = await axios.get('https://babzip.duckdns.org/top10', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('[top10 data] : ', response.data);
      setRankData(response.data.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log('addData:', addData);
    console.log('rankData:', rankData);
    if (addData?.rank && addData.name && addData.address) {
      setRankData((prev) =>
        prev
          ? prev.map((item) =>
              item.rankValue === addData.rank
                ? {
                    ...item,
                    restaurantName: addData.name,
                    address: addData.address,
                  }
                : item
            )
          : []
      );
    }
    console.log(rankData);
  }, [addData]);

  useEffect(() => {
    getTop10Data();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>TOP 10</span>
      </div>
      <div className={styles.datas}>
        {rankData?.map((data, index) => (
          <RankingBar
            key={index}
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
                name={selected.restaurantName ?? ''}
                rank={selected.rankValue}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyRanking;
