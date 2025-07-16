import { ChevronLeft } from 'lucide-react';
import styles from './header.module.css';

type Props = {
  selectedTab: 'history' | 'ranking';
  onChange: (tab: 'history' | 'ranking') => void;
};

const Header = ({ selectedTab, onChange }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <ChevronLeft className={styles.icon} />
        <div>리스트</div>
      </div>
      <div className={styles.selectTab}>
        <div
          className={selectedTab === 'history' ? styles.selected : ''}
          onClick={() => onChange('history')}
        >
          내 기록
        </div>
        <div
          className={selectedTab === 'ranking' ? styles.selected : ''}
          onClick={() => onChange('ranking')}
        >
          랭킹
        </div>
      </div>
    </div>
  );
};

export default Header;
