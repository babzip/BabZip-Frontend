import { useState, type ChangeEvent } from "react";
import SearchBar from "../../components/common/SearchBar";
import styles from "./loginedPage.module.css";
function LoginedPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div className={styles.comtainer}>
      <SearchBar
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.currentTarget.value)
        }
        placeholder="검색할 맛집을 입력하세요."
      />
      <div className={styles.bottomRightGroup}>
        <Profile
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.currentTarget.value)
          }
        />
        <LoginBtn />
        <ListBtn />
      </div>
    </div>
  );
}

export default LoginedPage;
