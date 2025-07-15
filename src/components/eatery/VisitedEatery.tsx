import { Share, Star } from 'lucide-react';

import styles from './visitedEatery.module.css';
import { useState } from 'react';

type Props = {
  restaurentName: string;
  location: string;
  visitedDate: Date;
  visited: boolean;
  textContent: string;
  rating: number;
};

const VisitedEatery = ({
  restaurentName,
  location,
  visitedDate,
  visited,
  textContent,
  rating,
}: Props) => {
  const [isFullView, setIsFullView] = useState<boolean>(false);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurentName,
        text: `BabZip에서 ${restaurentName}을 공유합니다!`,
        url: 'https://babzip.netlify.app/',
      });
    } else {
      alert('공유하기를 지원하지 않는 환경입니다.');
    }
  };

  return (
    <div
      className={`${styles.container} ${
        isFullView ? styles.fullView : styles.unFullView
      }`}
    >
      <div className={styles.shareIcon} onClick={() => handleShare()}>
        <Share size={18} color='#CDD1D5' />
      </div>
      <div className={styles.topBar}>
        <hr onClick={() => setIsFullView(!isFullView)} />
        <div className={styles.title}>{restaurentName}</div>
        <div className={styles.subTitle}>
          {visited
            ? `${visitedDate.getFullYear()}년 ${
                visitedDate.getMonth() + 1
              }월 ${visitedDate.getDate()}일 방문`
            : '새로운 맛집'}
        </div>
        <div className={styles.address}>{location}</div>
        {visited ?? <button className={styles.addBtn}>추가하기</button>}
        {visited && (
          <>
            <p
              className={styles.review}
              style={isFullView ? { height: '60%' } : { height: '100%' }}
            >
              {textContent}
            </p>
            <button
              className={`${styles.modifyBtn} ${
                isFullView ? styles.fullViewBtn : styles.unFullViewBtn
              }`}
            >
              {!isFullView ? '추가하기' : '수정하기'}
            </button>
          </>
        )}
      </div>
      <div className={styles.rating}>
        <Star size={20} fill='yellow' />
        <span>{rating}</span>
      </div>
    </div>
  );
};

export default VisitedEatery;
