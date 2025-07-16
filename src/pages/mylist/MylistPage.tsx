import Header from '../../components/mylist/Header';
import MyHistory from '../../components/mylist/MyHistory';
import MyRanking from './MyRanking';
import styles from './mylist.module.css';
import { useState } from 'react';

function MylistPage() {
  const [selectedTab, setSelectedTab] = useState<'history' | 'ranking'>(
    'history'
  );
  return (
    <div className={styles.container}>
      <Header selectedTab={selectedTab} onChange={setSelectedTab} />
      {selectedTab === 'history' ? <MyHistory /> : <MyRanking />}
    </div>
  );
}

export default MylistPage;
