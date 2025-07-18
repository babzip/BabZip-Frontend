import { Star } from 'lucide-react';
import styles from './eateryHistoryBar.module.css';

export interface EateryHistoryBarType {
  rating: number;
  name: string;
  address: string;
  visitiedAt: Date;
}

interface Props extends EateryHistoryBarType {
  onClick: () => void;
}

const EateryHistoryBar = ({
  rating,
  name,
  address,
  visitiedAt,
  onClick,
}: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.ratingBox}>
        <Star size={25} color='yellow' fill='yellow' />
        <div className={styles.score}>{rating.toPrecision(2)}</div>
      </div>
      <div className={styles.columnBox}>
        <div className={styles.eateryName}>{name}</div>
        <div className={styles.etcInfo}>{address}</div>
        <div className={styles.etcInfo}>{`${visitiedAt.getFullYear()}년 ${
          visitiedAt.getMonth() + 1
        }월 ${visitiedAt.getDate()}일`}</div>
      </div>
    </div>
  );
};

export default EateryHistoryBar;
