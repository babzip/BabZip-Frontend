import type { RankingDataType } from '../../../store/useTop10Store';
import styles from './rankingBar.module.css';
import { useNavigate } from 'react-router-dom';

interface Props extends RankingDataType {
  isEditMode: boolean;
  onClick: () => void;
  onDragStart: (rankValue: number) => void;
  onDragOver: (rankValue: number) => void;
  onDrop: (rankValue: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isDragOver: boolean;
}

const RankingBar = ({
  rankValue,
  restaurantName,
  address,
  isEditMode,
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
  isDragOver,
}: Props) => {
  const navigate = useNavigate();
  const mappingRankIcon = (rank: number) => {
    if (rank == 1) return <img src='/gold_spoon.svg' />;
    if (rank == 2) return <img src='/silver_spoon.svg' />;
    if (rank == 3) return <img src='/bronze_spoon.svg' />;
    else return rank;
  };
  return (
    <div
      className={`${styles.container} ${isDragging ? styles.dragging : ''} ${
        isDragOver ? styles.dragOver : ''
      }`}
      onClick={onClick}
      onDragOver={(e) => {
        if (!isEditMode) return;
        e.preventDefault();
        onDragOver(rankValue);
      }}
      onDrop={(e) => {
        if (!isEditMode) return;
        e.preventDefault();
        onDrop(rankValue);
      }}
    >
      <div className={styles.ranking}>{mappingRankIcon(rankValue)}</div>
      <div className={styles.info}>
        <div
          className={styles.name}
          style={!restaurantName ? { display: 'none' } : undefined}
        >
          {restaurantName}
        </div>
        <div
          className={styles.address}
          style={!restaurantName ? { display: 'none' } : undefined}
        >
          {address}
        </div>
        <div className={styles.addBtnBox}>
          {!restaurantName && isEditMode ? (
            <button
              onClick={() =>
                navigate('/mylist/addlist', { state: { rankValue } })
              }
            >
              추가하기
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.dragable}>
        {isEditMode ? (
          <img
            src='/dragable_icon.svg'
            alt='drag handle'
            draggable
            onClick={(e) => e.stopPropagation()}
            onDragStart={(e) => {
              e.stopPropagation();
              onDragStart(rankValue);
            }}
            onDragEnd={(e) => {
              e.stopPropagation();
              onDragEnd();
            }}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default RankingBar;
