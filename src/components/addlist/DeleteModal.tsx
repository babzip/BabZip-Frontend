import styles from './deleteModal.module.css';
import { useNavigate } from 'react-router-dom';

type Props = {
  name: string;
  rank: number;
};

const DeleteModal = ({ name, rank }: Props) => {
  const navigate = useNavigate();
  const page = 'ranking';
  return (
    <div className={styles.container}>
      <img src='/delete_icon.svg' alt='' />
      <div className={styles.name}>{name}</div>
      <div className={styles.comment}>랭킹에서 삭제하시겠습니까?</div>
      <div className={styles.btnBox}>
        <button
          className={styles.addBtn}
          onClick={() =>
            navigate('/mylist', {
              state: { name: null, address: null, rank, page },
            })
          }
        >
          삭제
        </button>

        <button className={styles.cancelBtn}>취소</button>
      </div>
    </div>
  );
};

export default DeleteModal;
