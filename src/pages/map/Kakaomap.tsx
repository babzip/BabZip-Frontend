import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { Outlet } from 'react-router-dom';
import styles from './kakaomap.module.css';
import { useLocationStore } from '../../store/useLocationStore';
import { useMapStore } from '../../store/useMapStore';

type Lating = {
  lat: number;
  lng: number;
};

type GuestbookItem = {
  kakaoPlaceId: string;
  restaurantName: string;
  address: string;
  rating: number;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
};

function Kakaomap() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loaded, setLoaded] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const { center, marker, markerList, addMarker, clearMarkers } = useMapStore();
  const localMapRef = useRef<kakao.maps.Map | null>(null);
  const isSet = useRef(false);
  const setMapRef = useMapStore((state) => state.setMapRef);
  const setLocation = useLocationStore((state) => state.setLocation);

  const [position, setPosition] = useState<Lating>({
    lat: 33.450701,
    lng: 126.570667,
  });

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setLoaded(true);
    } else {
      const id = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          setLoaded(true);
          clearInterval(id);
        }
      }, 50);
    }
  }, []);

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

  useEffect(() => {
    if (!loaded) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    let isCancelled = false;

    const geocoder = new window.kakao.maps.services.Geocoder();
    const geocodeAddress = (address: string) =>
      new Promise<Lating | null>((resolve) => {
        if (!address) {
          resolve(null);
          return;
        }

        geocoder.addressSearch(address, (result, status) => {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            resolve({
              lat: Number(result[0].y),
              lng: Number(result[0].x),
            });
            return;
          }
          resolve(null);
        });
      });

    const fetchRatedMarkers = async () => {
      try {
        const allGuestbooks: GuestbookItem[] = [];
        let page = 0;
        let totalPages = 1;

        while (page < totalPages) {
          const response = await axios.get(
            `${apiUrl}/guestbook/me?page=${page}&sort=createdAt,DESC`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          const data = response.data?.data;
          const content = (data?.content ?? []) as GuestbookItem[];
          totalPages = data?.totalPages ?? page + 1;

          allGuestbooks.push(...content);
          page += 1;
        }

        const ratedGuestbooks = allGuestbooks.filter((item) => item.rating > 0);

        const markers = await Promise.all(
          ratedGuestbooks.map(async (item) => {
            const lat = item.lat ?? item.latitude;
            const lng = item.lng ?? item.longitude;

            if (typeof lat === 'number' && typeof lng === 'number') {
              return {
                id: item.kakaoPlaceId,
                lat,
                lng,
                placeName: item.restaurantName,
                address: item.address,
              };
            }

            const geocoded = await geocodeAddress(item.address);
            if (!geocoded) return null;

            return {
              id: item.kakaoPlaceId,
              lat: geocoded.lat,
              lng: geocoded.lng,
              placeName: item.restaurantName,
              address: item.address,
            };
          })
        );

        if (isCancelled) return;

        clearMarkers();
        markers
          .filter((item): item is NonNullable<typeof item> => item !== null)
          .forEach((item) => addMarker(item));
      } catch (err) {
        console.error('[마커 초기화 에러] :', err);
      }
    };

    fetchRatedMarkers();

    return () => {
      isCancelled = true;
    };
  }, [addMarker, apiUrl, clearMarkers, loaded]);

  if (!loaded) return <div>지도 로딩 중...</div>;

  return (
    <div className={styles.wrapper}>
      <Map
        center={center}
        level={3}
        className={styles.map}
        onClick={() => setSelectedMarkerId(null)}
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
              src: '/location_marker.svg',
              size: { width: 30, height: 30 },
            }}
            onClick={() => {
              setSelectedMarkerId(marker.id);
            }}
          >
            {selectedMarkerId === marker.id && (
              <div className={styles.infoWindow}>
                <div className={styles.infoTitle}>
                  {marker.placeName || '가게 정보'}
                </div>
                <div className={styles.infoAddress}>
                  {marker.address || '주소 정보가 없습니다.'}
                </div>
              </div>
            )}
          </MapMarker>
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
              src: '/location_marker.svg',
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
