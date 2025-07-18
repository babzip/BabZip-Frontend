import styles from "./modal.module.css";

type Props = {
  onClick: () => void;
};

const Modal = ({ onClick }: Props) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <img src="/Ellipse.png" alt="X" className={styles.image} />
      <p>맛집 기록을 삭제 하시겠습니까?</p>
      <div className={styles.container}>
        <button className={styles.DelBtn}>삭제</button>
        <button className={styles.CancelBtn}>취소</button>
      </div>
    </div>
  );
};

export default Modal;
