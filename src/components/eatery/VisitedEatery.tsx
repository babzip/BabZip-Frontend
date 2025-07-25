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
  const [isFullView, setIsFullView] = useState<boolean>(false);
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
    <div
      className={`${styles.container} ${
        isFullView && visited ? styles.fullView : styles.unFullView
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
        {!visited ? (
          <button onClick={onAddClicked} className={styles.addBtn}>
            추가하기
          </button>
        ) : (
          ''
        )}
        {visited && (
          <>
            <p
              className={styles.review}
              style={isFullView ? { height: '60%' } : { height: '100%' }}
            >
              {textContent}
            </p>
            {isFullView ? (
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
            ) : (
              <button
                className={`${styles.modifyBtn} ${
                  isFullView ? styles.fullViewBtn : styles.unFullViewBtn
                }`}
                onClick={onModifyClicked}
              >
                수정하기
              </button>
            )}
          </>
        )}
      </div>
      {visited ? (
        <div className={styles.rating}>
          <Star size={20} fill='yellow' />
          <span>{rating}</span>
        </div>
      ) : (
        ''
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
