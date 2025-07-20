import styles from './deleteModal.module.css';

type Props = {
  name: string;
  onCancel: () => void;
  onDelete: () => void;
};

const DeleteModal = ({ name, onCancel, onDelete }: Props) => {
  return (
    <div className={styles.container}>
      <img src='/delete_icon.svg' alt='' />
      <div className={styles.name}>{name}</div>
      <div className={styles.comment}>랭킹에서 삭제하시겠습니까?</div>
      <div className={styles.btnBox}>
        <button
          className={styles.addBtn}
          onClick={() => {
            onDelete();
            onCancel();
          }}
        >
          삭제
        </button>

        <button className={styles.cancelBtn} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
