import styles from "./listBtn.module.css";

type Props = {
  onClick: () => void;
};

const ListBtn = ({ onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <img src="/Ellipse.png" alt="프로필" className={styles.image} />
      <span className={styles.text}>리스트</span>
    </div>
  );
};

export default ListBtn;
