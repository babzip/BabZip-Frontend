import { Share } from 'lucide-react';
import styles from './visitedEatery.module.css';
import { useState } from 'react';

type Props = {
  restaurentName: string;
  location: string;
  visitedDate: Date;
  visited: boolean;
  textContent: string;
};

const VisitedEatery = ({
  restaurentName,
  location,
  visitedDate,
  visited,
  textContent,
}: Props) => {
  const [reviewText, setReviewText] = useState<string>(textContent);

  return (
    <div className={styles.container}>
      <div className={styles.shareIcon}>
        <Share size={18} color='#CDD1D5' />
      </div>
      <div className={styles.topBar}>
        <hr />
        <div className={styles.title}>{restaurentName}</div>
        <div className={styles.subTitle}>
          {visited
            ? `${visitedDate.getFullYear()}년 ${
                visitedDate.getMonth() + 1
              }월 ${visitedDate.getDate()}일 방문`
            : '새로운 맛집'}
        </div>
        <div className={styles.address}>{location}</div>
        <button className={styles.addBtn}>추가하기</button>
        {visited && (
          <>
            <textarea
              name='review'
              className={styles.review}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <button className={styles.addBtn}>수정</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VisitedEatery;
