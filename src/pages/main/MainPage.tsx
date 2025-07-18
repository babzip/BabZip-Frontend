import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import LoginCircleBtn from '../../components/login/LoginCircleBtn';
import styles from './mainpage.module.css';
import { useState, type ChangeEvent } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import ListBtn from '../../components/logined/ListBtn';
import Profile from '../../components/logined/Profile';
import ToggleMenuBtn from '../../components/logined/ToggleMenuBtn';

function MainPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isUnflod, setIsUnfold] = useState<boolean>(false);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore.getState().isLoggedIn;
  return (
    <div className={styles.container}>
      <SearchBar
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.currentTarget.value)
        }
        placeholder='검색할 맛집을 입력하세요.'
      />
      <div className={styles.bottomWrapper}>
        {!isLoggedIn ? (
          <LoginCircleBtn
            onClick={() => {
              navigate('/login');
            }}
          />
        ) : !isUnflod ? (
          <Profile onClick={() => setIsUnfold(true)} />
        ) : (
          <div className={styles.btnBox}>
            <Profile onClick={() => navigate('/mypage')} />
            <ListBtn onClick={() => navigate('/mylist')} />
            <ToggleMenuBtn onClick={() => setIsUnfold(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
