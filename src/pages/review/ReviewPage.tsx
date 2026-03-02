import { useEffect, useState } from 'react';

import Modal from '../../components/modal/Modal';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import styles from './reviewpage.module.css';

type Props = {
  name: string;
  address: string;
  kakaoPlaceId: string;
  visitedDate: Date;
  closeModal: () => void;
  initialRating?: number;
  onReviewSubmitted?: () => void;
  initialContent?: string;
};

const ReviewPage = ({
  name,
  address,
  kakaoPlaceId,
  visitedDate,
  closeModal,
  onReviewSubmitted,
  initialContent,
  initialRating,
}: Props) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const accessToken = localStorage.getItem('accessToken');
  const [value, setValue] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isCheckModalOn, setIsCheckModalOn] = useState<boolean>(false);

  useEffect(() => {
    setValue(initialContent ?? '');
    setRating(initialRating ?? 0);
  }, [initialContent, initialRating]);

  const handleWrite = async () => {
    const body = {
      restaurantName: name,
      address: address,
      kakaoPlaceId: kakaoPlaceId,
      content: value,
      rating: rating,
    };
    try {
      if (initialContent && initialContent) {
        const response = await axios.patch(`${apiUrl}/guestbook`, body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('[수정 결과] : ', response);
      } else {
        const response = await axios.post(`${apiUrl}/guestbook`, body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('[작성 결과] : ', response);
      }

      closeModal();
      onReviewSubmitted?.();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.sheetHandle} />
      <div className={styles.header}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.date}>{`${visitedDate.getFullYear()}년 ${
          visitedDate.getMonth() + 1
        }월 ${visitedDate.getDate()}일 방문`}</p>
        <p className={styles.address}>{address}</p>
      </div>

      <div className={styles.formArea}>
        <div className={styles.label}>별점</div>
        <div className={styles.starReview}>
          <Rating
            onClick={(rate) => {
              setRating(rate);
            }}
            initialValue={rating}
            allowFraction={true}
            size={26}
            fillColor='#facc15'
            emptyColor='#d1d5db'
            transition
          />
        </div>

        <div className={styles.label}>메모</div>
        <textarea
          placeholder='방문 후기를 남겨보세요.'
          className={styles.memo}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        ></textarea>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.editBtn}
          onClick={() => setIsCheckModalOn(true)}
        >
          {initialContent ? '수정 완료' : '작성 완료'}
        </button>
      </div>

      <div className={styles.modal}>
        {isCheckModalOn && (
          <div className={styles.overlay}>
            <Modal
              buttonName='확인'
              content='변경사항을 등록하시겠습니까 ?'
              url='cancel_modal_icon.svg'
              onCancel={() => {
                setIsCheckModalOn(false);
                closeModal();
              }}
              onOk={() => handleWrite()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
