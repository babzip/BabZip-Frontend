import { ChevronRight } from "lucide-react";
import Header from "../../components/mypage/Header";
import styles from "./mypage.module.css";
import { useEffect, useState } from "react";

const dummyData = {
  name: "홍길동",
  numOfFoods: 100,
  rating: 5.0,
  account: "kakao",
};

function MyPage() {
  const [profileData, setProfileData] = useState(dummyData);
  useEffect(() => {
    setProfileData(dummyData);
  }, []);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.profileImg}>
        <img src="/" alt="프로필이미지" />
      </div>
      <div className={styles.nickname}>
        <div>닉네임</div>
        <div className={styles.data}>
          <span>{profileData.name}</span>
          <ChevronRight />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.numOfFoods}>
          <div>등록한 음식점 개수</div>
          <div className={styles.data}>{profileData.numOfFoods}</div>
        </div>
        <div className={styles.rating}>
          <div>평균 별점</div>
          <div className={styles.data}>{profileData.rating.toPrecision(2)}</div>
        </div>
      </div>
      <div className={styles.socialAccount}>
        <div>연동된 소셜 계정</div>
        <div className={styles.iconBox}>
          {profileData.account === "kakao" ? (
            <img src="/kakao_icon.svg" />
          ) : (
            <img src="/google_icon.svg" />
          )}
        </div>
      </div>

      <div className={styles.etc}>
        <div className={styles.logout}>로그아웃</div>
        <div
          className={styles.quit}
          onClick={() => console.log("어딜나가잉 시져시져")}
        >
          회원 탈퇴
        </div>
      </div>
    </div>
  );
}

export default MyPage;
