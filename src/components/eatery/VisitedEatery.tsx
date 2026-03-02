import { Share, Star } from 'lucide-react';

import Modal from '../modal/Modal';
import styles from './visitedEatery.module.css';
import { useState } from 'react';

type Props = {
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

  const getKakaoMapUrl = () => {
    const query = restaurentName.trim();
    return `https://map.kakao.com/link/search/${encodeURIComponent(query)}`;
  };

  const handleOpenKakaoMap = () => {
    window.open(getKakaoMapUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const mapUrl = getKakaoMapUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          url: mapUrl,
        });
        return;
      } catch {
        // 공유 취소/실패 시 클립보드 복사로 폴백
      }
    }

    try {
      await navigator.clipboard.writeText(mapUrl);
      alert('카카오맵 링크를 복사했습니다.');
    } catch {
      alert('링크 복사에 실패했습니다.');
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
          <div className={styles.mainMeta}>
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

          <button className={styles.mapBtn} onClick={handleOpenKakaoMap}>
            카카오맵으로 열기
          </button>
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
