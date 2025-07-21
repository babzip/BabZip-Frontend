import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';

import { Outlet } from 'react-router-dom';
import styles from './kakaomap.module.css';
import { useLocationStore } from '../../store/useLocationStore';
import { useMapStore } from '../../store/useMapStore';

type Lating = {
  lat: number;
  lng: number;
};

function Kakaomap() {
  const { center, marker } = useMapStore();
  const localMapRef = useRef<kakao.maps.Map | null>(null);
  const isSet = useRef(false);
  const setMapRef = useMapStore((state) => state.setMapRef);
  const setLocation = useLocationStore((state) => state.setLocation);

  const [position, setPosition] = useState<Lating>({
    lat: 33.450701,
    lng: 126.570667,
  });
  const { markerList } = useMapStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation(latitude, longitude);
      useMapStore.getState().setCenter(latitude, longitude);
    });

    const watcher = navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation(latitude, longitude);
      setPosition({ lat: latitude, lng: longitude });
    });

    return () => navigator.geolocation.clearWatch(watcher);
  }, [setLocation]);

  return (
    <div className={styles.wrapper}>
      <Map
        center={center}
        level={3}
        className={styles.map}
        onCreate={(map) => {
          if (!isSet.current) {
            localMapRef.current = map;
            setMapRef(localMapRef);
            isSet.current = true;
          }
        }}
      >
        {markerList.map((marker) => (
          <MapMarker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            image={{
              src: '/location.marker.svg',
              size: { width: 30, height: 30 },
            }}
          />
        ))}

        <MapMarker
          position={position}
          image={{
            src: '/my_location.svg',
            size: { width: 40, height: 40 },
          }}
        />
        {marker && (
          <MapMarker
            position={marker}
            image={{
              src: '/location.marker.svg',
              size: { width: 30, height: 30 },
            }}
          />
        )}
      </Map>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Kakaomap;
