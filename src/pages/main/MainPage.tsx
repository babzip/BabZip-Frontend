import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import LoginCircleBtn from '../../components/login/LoginCircleBtn';
import styles from './mainpage.module.css';
import { useState, type ChangeEvent } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import ListBtn from '../../components/logined/ListBtn';
import Profile from '../../components/logined/Profile';
import ToggleMenuBtn from '../../components/logined/ToggleMenuBtn';
import { Focus, Minus, Plus } from 'lucide-react';
import { useLocationStore } from '../../store/useLocationStore';
import { useMapStore } from '../../store/useMapStore';

function MainPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isUnflod, setIsUnfold] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mapRef } = useMapStore();
  const { lat, lng } = useLocationStore();
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  const imgUrl = useAuthStore.getState().picture;
  return (
    <div className={styles.container}>
      <SearchBar
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.currentTarget.value)
        }
        placeholder='검색할 맛집을 입력하세요.'
      />
      <div className={styles.buttons}>
        <div className={styles.locationOptions}>
          <div
            className={styles.focusBtn}
            onClick={() => {
              if (mapRef?.current) {
                mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
              }
            }}
          >
            <Focus />
          </div>
          <div className={styles.zoom}>
            <div
              onClick={() => {
                if (mapRef?.current) {
                  const currentLevel = mapRef.current.getLevel();
                  mapRef.current.setLevel(currentLevel - 1); // Zoom in (작은 숫자일수록 더 가까움)
                }
              }}
            >
              <Plus />
            </div>
            <div
              onClick={() => {
                console.log('클릭됨');
                if (mapRef?.current) {
                  const currentLevel = mapRef.current.getLevel();
                  mapRef.current.setLevel(currentLevel + 1); // Zoom out (큰 숫자일수록 더 멀어짐)
                }
              }}
            >
              <Minus />
            </div>
          </div>
        </div>
        <div className={styles.bottomWrapper}>
          {!isLoggedIn ? (
            <LoginCircleBtn
              onClick={() => {
                navigate('/login');
              }}
            />
          ) : !isUnflod ? (
            <Profile imgUrl={imgUrl ?? ''} onClick={() => setIsUnfold(true)} />
          ) : (
            <div className={styles.btnBox}>
              <Profile
                imgUrl={imgUrl ?? ''}
                onClick={() => navigate('/mypage')}
              />
              <ListBtn onClick={() => navigate('/mylist')} />
              <ToggleMenuBtn onClick={() => setIsUnfold(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
