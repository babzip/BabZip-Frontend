import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import LoginCircleBtn from '../../components/login/LoginCircleBtn';
import styles from './mainpage.module.css';
import { useState, type ChangeEvent } from 'react';

function MainPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
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
        <LoginCircleBtn
          onClick={() => {
            navigate('/login');
          }}
        />
      </div>
    </div>
  );
}

export default MainPage;
