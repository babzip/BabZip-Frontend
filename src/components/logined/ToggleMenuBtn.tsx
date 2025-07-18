import { ChevronDown } from 'lucide-react';
import styles from './toggleMenuBtn.module.css';

type Props = {
  onClick: () => void;
};

const ToggleMenuBtn = ({ onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <ChevronDown size={28} />
    </div>
  );
};

export default ToggleMenuBtn;
