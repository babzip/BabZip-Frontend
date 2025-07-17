import type { RankingDataType } from './MyRanking';
import styles from './rankingBar.module.css';

const RankingBar = ({ rank, eateryName, address }: RankingDataType) => {
  const mappingRankIcon = (rank: number) => {
    if (rank == 1) return <img src='/gold_spoon.svg' />;
    if (rank == 2) return <img src='/silver_spoon.svg' />;
    if (rank == 3) return <img src='/bronze_spoon.svg' />;
    else return rank;
  };
  return (
    <div className={styles.container}>
      <div className={styles.ranking}>{mappingRankIcon(rank)}</div>
      <div className={styles.info}>
        <div className={styles.name}>{eateryName}</div>
        <div className={styles.address}>{address}</div>
      </div>
    </div>
  );
};

export default RankingBar;
