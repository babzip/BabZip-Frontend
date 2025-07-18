import styles from "./toggleMenuBtn.module.css";

type Props = {
  onClick: () => void;
};

const ToggleMenuBtn = ({ onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <img src="/Ellipse.png" alt="돌아가기" className={styles.image} />
    </div>
  );
};

export default ToggleMenuBtn;
