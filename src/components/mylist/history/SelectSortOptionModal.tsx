import { Check } from 'lucide-react';
import styles from './selectSortOptionModal.module.css';

type Props = {
  selected: 'latest' | 'rating';
  onChange: (select: 'latest' | 'rating') => void;
};

const SelectSortOptionModal = ({ selected, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <hr />
      <div className={styles.title}>정렬</div>
      <div
        className={styles.latestTab}
        onClick={() => onChange('latest')}
        style={selected === 'latest' ? { color: '#7D7AFF' } : undefined}
      >
        <div>최신순</div>
        <div>{selected === 'latest' ? <Check /> : ''}</div>
      </div>
      <div
        className={styles.ratingTab}
        onClick={() => onChange('rating')}
        style={selected === 'rating' ? { color: '#7D7AFF' } : undefined}
      >
        <div>별점순</div>
        <div>{selected === 'rating' ? <Check /> : ''}</div>
      </div>
    </div>
  );
};

export default SelectSortOptionModal;
