import { useCallback, useEffect, useState } from 'react';

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
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);
  const [selectedRank, setSelectedRank] = useState(0);
  const [draggingRank, setDraggingRank] = useState<number | null>(null);
  const [dragOverRank, setDragOverRank] = useState<number | null>(null);
  const [originalRankData, setOriginalRankData] = useState<RankingDataType[]>(
    []
  );
  const accessToken = localStorage.getItem('accessToken');

  const { setRankData, clearRank } = useTop10Store();
  const rankData = useTop10Store((state) => state.rankData);

  const getTop10Data = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/top10`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRankData(res.data.data.content);
      setOriginalRankData(res.data.data.content);
    } catch (err) {
      console.error('[top10 get 에러] :', err);
    }
  }, [accessToken, apiUrl, setRankData]);

  const editTop10Data = async (data: RankingDataType[]) => {
    try {
      const res = await axios.post(`${apiUrl}/top10`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(res);
      console.log('[top10 저장 완료]');
    } catch (err) {
      console.error('[top10 저장 에러] :', err);
    }
  };

  const hasChanged = (a: RankingDataType[], b: RankingDataType[]) => {
    return JSON.stringify(a) !== JSON.stringify(b);
  };

  const moveRank = (fromRank: number, toRank: number) => {
    const fromIndex = rankData.findIndex((item) => item.rankValue === fromRank);
    const toIndex = rankData.findIndex((item) => item.rankValue === toRank);

    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

    const copied = [...rankData];
    const [moved] = copied.splice(fromIndex, 1);
    copied.splice(toIndex, 0, moved);

    const reRanked = copied.map((item, idx) => ({
      ...item,
      rankValue: idx + 1,
    }));
    setRankData(reRanked);
  };

  useEffect(() => {
    getTop10Data();
  }, [getTop10Data]);

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
            onDragStart={(rankValue) => {
              if (!isEditMode) return;
              setDraggingRank(rankValue);
            }}
            onDragOver={(rankValue) => {
              if (!isEditMode) return;
              setDragOverRank(rankValue);
            }}
            onDrop={(rankValue) => {
              if (!isEditMode || draggingRank === null) return;
              moveRank(draggingRank, rankValue);
              setDraggingRank(null);
              setDragOverRank(null);
            }}
            onDragEnd={() => {
              setDraggingRank(null);
              setDragOverRank(null);
            }}
            isDragging={draggingRank === data.rankValue}
            isDragOver={dragOverRank === data.rankValue}
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
              setDraggingRank(null);
              setDragOverRank(null);
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
