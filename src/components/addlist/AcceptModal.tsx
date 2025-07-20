import axios from 'axios';
import styles from './acceptModel.module.css';
import { useNavigate } from 'react-router-dom';
import { useTop10Store } from '../../store/useTop10Store';

type Props = {
  name: string;
  address: string;
  rank: number;
  onCancel: () => void;
};

const AcceptModal = ({ name, address, rank, onCancel }: Props) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const { updateRank } = useTop10Store();
  const handleAdd = async () => {
    updateRank(rank, name, address);

    const updated = useTop10Store.getState().rankData;
    try {
      await axios.post('https://babzip.duckdns.org/top10', updated, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (err) {
      console.error('[POST 실패]', err);
    }

    navigate('/mylist');
  };
  return (
    <div className={styles.container}>
      <img src='/add_icon.svg' alt='' />
      <div className={styles.name}>{name}</div>
      <div className={styles.comment}>랭킹에 추가하시겠습니까?</div>
      <div className={styles.btnBox}>
        <button className={styles.addBtn} onClick={handleAdd}>
          추가
        </button>

        <button className={styles.cancelBtn} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default AcceptModal;
