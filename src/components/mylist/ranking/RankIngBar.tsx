import type { RankingDataType } from '../../../store/useTop10Store';
import styles from './rankingBar.module.css';
import { useNavigate } from 'react-router-dom';

interface Props extends RankingDataType {
  isEditMode: boolean;
  onClick: () => void;
}

const RankingBar = ({
  rankValue,
  restaurantName,
  address,
  isEditMode,
  onClick,
}: Props) => {
  const navigate = useNavigate();
  const mappingRankIcon = (rank: number) => {
    if (rank == 1) return <img src='/gold_spoon.svg' />;
    if (rank == 2) return <img src='/silver_spoon.svg' />;
    if (rank == 3) return <img src='/bronze_spoon.svg' />;
    else return rank;
  };
  return (
    <div className={styles.container} onClick={onClick}>
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
        {isEditMode ? <img src='/dragable_icon.svg' alt='' /> : ''}
      </div>
    </div>
  );
};

export default RankingBar;
