import { ChevronLeft } from 'lucide-react';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container} onClick={() => navigate(-1)}>
      <ChevronLeft className={styles.icon} />
      <div className={styles.title}>프로필</div>
    </div>
  );
};

export default Header;
