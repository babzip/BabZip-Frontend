import { Share } from 'lucide-react';
import styles from './noVisitedEatery.module.css';

type Props = {
  restaurentName: string;
  location: string;
};

const NoVistedEatery = ({ restaurentName, location }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.shareIcon}>
        <Share size={18} color='#CDD1D5' />
      </div>
      <div className={styles.topBar}>
        <hr />
        <div className={styles.title}>{restaurentName}</div>
        <div className={styles.subTitle}>새로운 맛집</div>
        <div className={styles.address}>{location}</div>
        <button className={styles.addBtn}>추가하기</button>
      </div>
    </div>
  );
};

export default NoVistedEatery;
