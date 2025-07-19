import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import styles from './kakaomap.module.css';
import { useLocationStore } from '../../store/useLocationStore';

type Lating = {
  lat: number;
  lng: number;
};

function Kakaomap() {
  const setLocation = useLocationStore((state) => state.setLocation);
  const [center, setCenter] = useState<Lating>({
    lat: 33.450701,
    lng: 126.570667,
  });

  const [position, setPosition] = useState<Lating>({
    lat: 33.450701,
    lng: 126.570667,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation(latitude, longitude);
      setCenter({ lat: latitude, lng: longitude });
    });

    const watcher = navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation(latitude, longitude);
      setPosition({ lat: latitude, lng: longitude });
      setCenter({ lat: latitude, lng: longitude });
    });

    return () => navigator.geolocation.clearWatch(watcher);
  }, [setLocation]);

  return (
    <div className={styles.wrapper}>
      <Map center={center} level={3} className={styles.map}>
        <MapMarker
          position={position}
          image={{
            src: '/my_location.svg',
            size: { width: 40, height: 40 },
          }}
        />
      </Map>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Kakaomap;
