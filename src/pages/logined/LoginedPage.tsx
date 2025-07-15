import { useState, type ChangeEvent } from "react";
import SearchBar from "../../components/common/SearchBar";
import styles from "./loginedPage.module.css";
import Profile from "../../components/logined/Profile";
import ListBtn from "../../components/logined/ListBtn";
import ToggleMenuBtn from "../../components/logined/ToggleMenuBtn";

function LoginedPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isUnflod, setIsUnfold] = useState<boolean>(false);

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
        {!isUnflod ? (
          <Profile onClick={() => setIsUnfold(!isUnflod)} />
        ) : (
          <>
            <Profile onClick={() => console.log("프로필 클릭됨")} />
            <ListBtn onClick={() => console.log("리스트 클릭됨")} />
            <ToggleMenuBtn onClick={() => setIsUnfold(!isUnflod)} />
          </>
        )}
      </div>
    </div>
  );
}

export default LoginedPage;
