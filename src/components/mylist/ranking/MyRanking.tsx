import { useEffect, useState } from 'react';

import DeleteModal from '../../addlist/DeleteModal';
import { Pencil } from 'lucide-react';
import RankingBar from './RankIngBar';
import axios from 'axios';
import styles from './myranking.module.css';
import {
  useTop10Store,
  type RankingDataType,
} from '../../../store/useTop10Store';

const MyRanking = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);
  const [selectedRank, setSelectedRank] = useState(0);
  const [originalRankData, setOriginalRankData] = useState<RankingDataType[]>(
    []
  );
  const accessToken = localStorage.getItem('accessToken');

  const { setRankData, updateRank, clearRank } = useTop10Store();
  const rankData = useTop10Store((state) => state.rankData);

  const getTop10Data = async () => {
    try {
      const res = await axios.get('https://babzip.duckdns.org/top10', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRankData(res.data.data.content);
      setOriginalRankData(res.data.data.content);
    } catch (err) {
      console.error('[top10 get 에러] :', err);
    }
  };

  const editTop10Data = async (data) => {
    try {
      const res = await axios.post('https://babzip.duckdns.org/top10', data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('[top10 저장 완료]');
    } catch (err) {
      console.error('[top10 저장 에러] :', err);
    }
  };

  const hasChanged = (a: RankingDataType[], b: RankingDataType[]) => {
    return JSON.stringify(a) !== JSON.stringify(b);
  };

  useEffect(() => {
    if (hasChanged(rankData, originalRankData)) {
      editTop10Data(rankData);
      setOriginalRankData(rankData);
    }
  }, [rankData]);

  useEffect(() => {
    getTop10Data();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>TOP 10</span>
      </div>

      <div className={styles.datas}>
        {rankData.map((data, idx) => (
          <RankingBar
            key={idx}
            {...data}
            isEditMode={isEditMode}
            onClick={
              isEditMode
                ? () => {
                    setSelectedRank(data.rankValue);
                    setIsDeleteModalOn(true);
                  }
                : () => {}
            }
          />
        ))}
      </div>

      <div className={styles.editIcon} onClick={() => setIsEditMode(true)}>
        <Pencil size={25} color='#7D7AFF' fill='white' />
      </div>

      {isEditMode && (
        <div className={styles.btnBox}>
          <button
            className={styles.doneBtn}
            onClick={() => {
              setIsEditMode(false);
              if (hasChanged(rankData, originalRankData)) {
                editTop10Data(rankData);
                setOriginalRankData(rankData);
              }
            }}
          >
            완료
          </button>
        </div>
      )}

      {isDeleteModalOn && (
        <>
          <div
            className={styles.modalOverlay}
            onClick={() => setIsDeleteModalOn(false)}
          />
          <div className={styles.modal}>
            <DeleteModal
              onDelete={() => {
                clearRank(selectedRank);
                const updated = useTop10Store.getState().rankData;
                editTop10Data(updated);

                setOriginalRankData(updated);
                setIsDeleteModalOn(false);
              }}
              onCancel={() => setIsDeleteModalOn(false)}
              name={
                rankData.find((item) => item.rankValue === selectedRank)
                  ?.restaurantName ?? ''
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyRanking;
