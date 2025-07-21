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
  initialContent?: string;
};

const ReviewPage = ({
  name,
  address,
  kakaoPlaceId,
  visitedDate,
  closeModal,
  initialContent,
  initialRating,
}: Props) => {
  const accessToken = localStorage.getItem('accessToken');
  const [value, setValue] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isCheckModalOn, setIsCheckModalOn] = useState<boolean>(false);

  useEffect(() => {
    setValue(initialContent ?? '');
    setRating(initialRating ?? 0);
  }, []);

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
        const response = await axios.patch(
          'https://babzip.duckdns.org/guestbook',
          body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('[수정 결과] : ', response);
      } else {
        const response = await axios.post(
          'https://babzip.duckdns.org/guestbook',
          body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('[작성 결과] : ', response);
      }

      closeModal();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.date}>{`${visitedDate.getFullYear()}년 ${
        visitedDate.getMonth() + 1
      }월 ${visitedDate.getDate()}일`}</p>
      <p className={styles.address}>{address}</p>

      <div className={styles.starReview}>
        <Rating
          onClick={(rate) => {
            setRating(rate);
          }}
          initialValue={rating * 20}
          allowFraction={true}
          size={24}
          fillColor='#FFD700'
          emptyColor='#ccc'
          transition
        />
      </div>
      <textarea
        placeholder='메세지를 입력하세요.'
        className={styles.memo}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      ></textarea>

      <button
        className={styles.editBtn}
        onClick={() => setIsCheckModalOn(true)}
      >
        완료
      </button>

      <div className={styles.modal}>
        {isCheckModalOn && (
          <div className={styles.overlay}>
            <Modal
              buttonName='확인'
              content='변경사항을 등록하시겠습니까 ?'
              url='cancel_modal_icon.svg'
              onCancel={() => setIsCheckModalOn(false)}
              onOk={() => handleWrite()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
