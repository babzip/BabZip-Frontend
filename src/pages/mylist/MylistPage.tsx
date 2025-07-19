import { useEffect, useState } from 'react';

import Header from '../../components/mylist/Header';
import MyHistory from '../../components/mylist/history/MyHistory';
import MyRanking from '../../components/mylist/ranking/MyRanking';
import styles from './mylist.module.css';
import { useLocation } from 'react-router-dom';

function MylistPage() {
  const [selectedTab, setSelectedTab] = useState<'history' | 'ranking'>(
    'history'
  );
  const location = useLocation();
  const page = location.state?.page;

  useEffect(() => {
    if (page === 'ranking' || page === 'history') {
      setSelectedTab(page);
    }
  }, [page]);

  return (
    <div className={styles.container}>
      <Header selectedTab={selectedTab} onChange={setSelectedTab} />
      {selectedTab === 'history' ? <MyHistory /> : <MyRanking />}
    </div>
  );
}

export default MylistPage;
