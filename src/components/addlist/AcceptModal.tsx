import styles from './acceptModel.module.css';
import { useNavigate } from 'react-router-dom';

type Props = {
  name: string;
  address: string;
  rank: number;
};

const AcceptModal = ({ name, address, rank }: Props) => {
  const navigate = useNavigate();
  const page = 'ranking';
  return (
    <div className={styles.container}>
      <img src='/add_icon.svg' alt='' />
      <div className={styles.name}>{name}</div>
      <div className={styles.comment}>랭킹에 추가하시겠습니까?</div>
      <div className={styles.btnBox}>
        <button
          className={styles.addBtn}
          onClick={() =>
            navigate('/mylist', { state: { name, address, rank, page } })
          }
        >
          추가
        </button>

        <button className={styles.cancelBtn}>취소</button>
      </div>
    </div>
  );
};

export default AcceptModal;
