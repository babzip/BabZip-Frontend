import { Map } from 'react-kakao-maps-sdk';
import { Outlet } from 'react-router-dom';
import styles from './kakaomap.module.css';

function Kakaomap() {
  return (
    <div className={styles.wrapper}>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        level={3}
        className={styles.map}
      />

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Kakaomap;
