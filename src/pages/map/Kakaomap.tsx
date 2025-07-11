import { Map } from 'react-kakao-maps-sdk';
import styles from './kakaomap.module.css';

function Kakaomap() {
    return (
        <Map
            center={{ lat: 33.450701, lng: 126.570667 }}
            className={styles.map}
            level={3}
        />
    );
}

export default Kakaomap;
