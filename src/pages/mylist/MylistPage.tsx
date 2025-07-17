import Header from '../../components/mylist/Header';
import MyHistory from '../../components/mylist/history/MyHistory';
import MyRanking from '../../components/mylist/ranking/MyRanking';
import styles from './mylist.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MylistPage() {
  const [selectedTab, setSelectedTab] = useState<'history' | 'ranking'>(
    'history'
  );
  const location = useLocation();
  const name = location.state?.name;
  const address = location.state?.address;
  const rank = location.state?.rank;
  const page = location.state?.page;

  return (
    <div className={styles.container}>
      <Header selectedTab={selectedTab} onChange={setSelectedTab} />
      {selectedTab === 'history' ? (
        <MyHistory />
      ) : (
        <MyRanking addData={{ name, address, rank }} />
      )}
    </div>
  );
}

export default MylistPage;
