import { Star } from 'lucide-react';
import styles from './eateryHistoryBar.module.css';

export interface EateryHistoryBarType {
  rating: number;
  restaurantName: string;
  kakaoPlaceId: string;
  content: string;
  address: string;
  createdAt: Date;
}

interface Props extends EateryHistoryBarType {
  onClick: () => void;
}

const EateryHistoryBar = ({
  rating,
  restaurantName,
  address,
  createdAt,
  onClick,
}: Props) => {
  const date = new Date(createdAt);
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.ratingBox}>
        <Star size={25} color='yellow' fill='yellow' />
        <div className={styles.score}>{rating.toPrecision(2)}</div>
      </div>
      <div className={styles.columnBox}>
        <div className={styles.eateryName}>{restaurantName}</div>
        <div className={styles.etcInfo}>{address}</div>
        <div className={styles.etcInfo}>{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일`}</div>
      </div>
    </div>
  );
};

export default EateryHistoryBar;
