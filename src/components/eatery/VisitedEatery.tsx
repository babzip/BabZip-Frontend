import { Share, Star } from 'lucide-react';

import Modal from '../modal/Modal';
import styles from './visitedEatery.module.css';
import { useState } from 'react';

type Props = {
  shareUrl: string;
  restaurentName: string;
  location: string;
  visitedDate: Date;
  visited: boolean;
  textContent: string;
  rating: number;
  onAddClicked: () => void;
  onModifyClicked: () => void;
  onDeleteClicked: () => void;
};

const VisitedEatery = ({
  shareUrl,
  restaurentName,
  location,
  visitedDate,
  visited,
  textContent,
  rating,
  onAddClicked,
  onModifyClicked,
  onDeleteClicked,
}: Props) => {
  const [isCheckModalOn, setIsCheckModalOn] = useState<boolean>(false);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurentName,
        text: `BabZip에서 ${restaurentName}을 공유합니다!`,
        url: shareUrl,
      });
    } else {
      alert('공유하기를 지원하지 않는 환경입니다.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sheetHandle} />
      <div className={styles.topBar}>
        <div className={styles.titleWrap}>
          <div className={styles.title}>{restaurentName}</div>
          <div className={styles.address}>{location}</div>
          <div className={styles.subTitle}>
            {visited
              ? `${visitedDate.getFullYear()}년 ${
                  visitedDate.getMonth() + 1
                }월 ${visitedDate.getDate()}일 방문`
              : '아직 기록이 없는 가게입니다.'}
          </div>
        </div>
        <div className={styles.rightMeta}>
          {visited ? (
            <div className={styles.rating}>
              <Star size={16} fill='#facc15' color='#facc15' />
              <span>{rating.toFixed(1)}</span>
            </div>
          ) : (
            ''
          )}
          <div className={styles.shareIcon} onClick={() => handleShare()}>
            <Share size={18} color='#6b7280' />
          </div>
        </div>
      </div>

      {!visited ? (
        <div className={styles.emptyCard}>방문 기록을 추가해 보세요.</div>
      ) : (
        <div className={styles.review}>{textContent}</div>
      )}

      {!visited ? (
        <button onClick={onAddClicked} className={styles.addBtn}>
          기록 추가하기
        </button>
      ) : (
        <div className={styles.btnBox}>
          <button
            className={styles.deleteBtn}
            onClick={() => setIsCheckModalOn(true)}
          >
            삭제하기
          </button>
          <button className={styles.modBtn} onClick={onModifyClicked}>
            수정하기
          </button>
        </div>
      )}
      {isCheckModalOn ? (
        <div className={styles.overlay}>
          <Modal
            url='/delete_modal_icon.svg'
            buttonName='삭제'
            content='맛집 기록을 삭제하시겠습니까?'
            onOk={() => onDeleteClicked()}
            onCancel={() => {
              setIsCheckModalOn(false);
            }}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default VisitedEatery;
