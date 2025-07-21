import { useEffect, useState } from 'react';

import { ChevronRight } from 'lucide-react';
import Header from '../../components/mypage/Header';
import axios from 'axios';
import styles from './mypage.module.css';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const [userInfo, setUserInfo] = useState<{
    name: string;
    picture: string;
    provider: string;
    restauranCount: string;
    averageRating: number;
  }>();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const getMyInfo = async () => {
    try {
      const response = await axios.get('https://babzip.duckdns.org/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data.data);
      setUserInfo(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.delete(
        'https://babzip.duckdns.org/user/logout',
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(response.data);
      logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.profileImg}>
        <img src={userInfo?.picture ?? ''} alt='프로필이미지' />
      </div>
      <div className={styles.nickname}>
        <div>닉네임</div>
        <div className={styles.data}>
          <span>{userInfo?.name}</span>
          <ChevronRight />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.numOfFoods}>
          <div>등록한 음식점 개수</div>
          <div className={styles.data}>{userInfo?.restauranCount}</div>
        </div>
        <div className={styles.rating}>
          <div>평균 별점</div>
          <div className={styles.data}>
            {userInfo?.averageRating?.toPrecision(2)}
          </div>
        </div>
      </div>
      <div className={styles.socialAccount}>
        <div>연동된 소셜 계정</div>
        <div className={styles.iconBox}>
          {userInfo?.provider?.toLowerCase() === 'kakao' ? (
            <img src='/kakao_icon.svg' />
          ) : (
            <img src='/google_icon.svg' />
          )}
        </div>
      </div>

      <div className={styles.etc}>
        <div className={styles.logout} onClick={handleLogout}>
          로그아웃
        </div>
        <div
          className={styles.quit}
          onClick={() => console.log('어딜나가잉 시져시져')}
        >
          회원 탈퇴
        </div>
      </div>
    </div>
  );
}

export default MyPage;
