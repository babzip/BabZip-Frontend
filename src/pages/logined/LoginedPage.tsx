import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import styles from "./loginedPage.module.css";
import Profile from "../../components/logined/Profile";
import ListBtn from "../../components/logined/ListBtn";
import ToggleMenuBtn from "../../components/logined/ToggleMenuBtn";

function LoginedPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isUnflod, setIsUnfold] = useState<boolean>(false);
  const navigate = useNavigate();

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
            <Profile onClick={() => navigate("/mypage")} />
            <ListBtn onClick={() => navigate("/mylist")} />
            <ToggleMenuBtn onClick={() => setIsUnfold(!isUnflod)} />
          </>
        )}
      </div>
    </div>
  );
}

export default LoginedPage;
