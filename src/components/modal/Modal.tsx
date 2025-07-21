import styles from './modal.module.css';

type Props = {
  content: string;
  buttonName: string;
  url: string;
  onOk: () => void;
  onCancel: () => void;
};

const Modal = ({ content, buttonName, url, onOk, onCancel }: Props) => {
  return (
    <div className={styles.wrapper}>
      <img src={url} alt='X' className={styles.image} />
      <p>{content}</p>
      <div className={styles.container}>
        <button className={styles.DelBtn} onClick={onOk}>
          {buttonName}
        </button>
        <button className={styles.CancelBtn} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default Modal;
