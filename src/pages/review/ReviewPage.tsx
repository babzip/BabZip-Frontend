import styles from "./reviewPage.module.css";

const ReviewPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>식당명</h2>
      <p className={styles.date}>2025년 0월 0일 방문</p>
      <p className={styles.address}>경상북도 구미시 인동 중앙로 1길</p>

      <div className={styles.images}>
        <img src="/food1.jpg" alt="음식1" className={styles.image} />
        <img src="/food2.jpg" alt="음식2" className={styles.image} />
      </div>

      <div className={styles.memoBox}>
        <p className={styles.memo}>메모가 된 메시지 </p>
      </div>

      <button className={styles.editBtn}>수정</button>
    </div>
  );
};

export default ReviewPage;
