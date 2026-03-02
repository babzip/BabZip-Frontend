import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { Outlet } from 'react-router-dom';
import ReviewPage from '../review/ReviewPage';
import VisitedEatery from '../../components/eatery/VisitedEatery';
import styles from './kakaomap.module.css';
import { useLocationStore } from '../../store/useLocationStore';
import { useMapStore, type MarkerType } from '../../store/useMapStore';

type Lating = {
  lat: number;
  lng: number;
};

type GuestbookItem = {
  kakaoPlaceId: string;
  restaurantName: string;
  address: string;
  rating: number;
  content: string;
  createdAt: string;
  placeUrl?: string;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
};

function Kakaomap() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loaded, setLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const [isModalOn, setIsModalOn] = useState(false);
  const [isModifyModalOn, setIsModifyModalOn] = useState(false);
  const { center, marker, markerList, addMarker, removeMarker, clearMarkers } =
    useMapStore();
  const localMapRef = useRef<kakao.maps.Map | null>(null);
  const isSet = useRef(false);
  const setMapRef = useMapStore((state) => state.setMapRef);
  const setLocation = useLocationStore((state) => state.setLocation);

  const [position, setPosition] = useState<Lating>({
    lat: 33.450701,
    lng: 126.570667,
  });

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null;

    const tryInitKakao = () => {
      if (!(window.kakao && window.kakao.maps)) return false;

      window.kakao.maps.load(() => {
        setLoaded(true);
      });
      return true;
    };

    if (!tryInitKakao()) {
      id = setInterval(() => {
        if (tryInitKakao() && id) {
          clearInterval(id);
        }
      }, 50);
    }

    return () => {
      if (id) clearInterval(id);
    };
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

  const loadRatedMarkers = useCallback(async () => {
    if (!loaded) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;
    const services = window.kakao?.maps?.services;
    if (!services?.Geocoder) {
      console.error('[마커 초기화 에러] Kakao services.Geocoder is not ready');
      return;
    }

    const geocoder = new services.Geocoder();
    const geocodeAddress = (address: string) =>
      new Promise<Lating | null>((resolve) => {
        if (!address) {
          resolve(null);
          return;
        }

        geocoder.addressSearch(address, (result, status) => {
          if (
            status === services.Status.OK &&
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
              rating: item.rating,
              content: item.content,
              createdAt: item.createdAt,
              placeUrl: item.placeUrl,
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
            rating: item.rating,
            content: item.content,
            createdAt: item.createdAt,
            placeUrl: item.placeUrl,
          };
        })
      );

      clearMarkers();
      markers
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .forEach((item) => addMarker(item));
    } catch (err) {
      console.error('[마커 초기화 에러] :', err);
    }
  }, [addMarker, apiUrl, clearMarkers, loaded]);

  useEffect(() => {
    loadRatedMarkers();
  }, [loadRatedMarkers]);

  const handleDeleteGuestbook = async () => {
    if (!selectedMarker) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    try {
      await axios.delete(`${apiUrl}/guestbook/${selectedMarker.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      removeMarker(selectedMarker.id);
      setIsModalOn(false);
      setIsModifyModalOn(false);
      setSelectedMarker(null);
    } catch (err) {
      console.error('[방명록 삭제 에러] :', err);
    }
  };

  if (!loaded) return <div>지도 로딩 중...</div>;

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
              src: '/location_marker.svg',
              size: { width: 30, height: 30 },
            }}
            onClick={() => {
              setSelectedMarker(marker);
              setIsModalOn(true);
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
              src: '/location_marker.svg',
              size: { width: 30, height: 30 },
            }}
          />
        )}
      </Map>

      <div className={styles.content}>
        <Outlet />
      </div>

      <div className={styles.modalRoot}>
        {isModalOn && selectedMarker && (
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => {
                setIsModalOn(false);
                setSelectedMarker(null);
              }}
            />
            <div className={styles.modal}>
              <VisitedEatery
                restaurentName={selectedMarker.placeName ?? '가게 정보'}
                location={selectedMarker.address ?? ''}
                visitedDate={
                  selectedMarker.createdAt
                    ? new Date(selectedMarker.createdAt)
                    : new Date()
                }
                visited={true}
                textContent={selectedMarker.content ?? ''}
                rating={selectedMarker.rating ?? 0}
                onAddClicked={() => {}}
                onModifyClicked={() => {
                  setIsModalOn(false);
                  setIsModifyModalOn(true);
                }}
                onDeleteClicked={handleDeleteGuestbook}
              />
            </div>
          </>
        )}
      </div>

      {isModifyModalOn && selectedMarker ? (
        <div className={styles.modifyModal}>
          <>
            <div
              className={styles.modalOverlay}
              onClick={() => {
                setIsModifyModalOn(false);
                setSelectedMarker(null);
              }}
            />
            <div className={styles.modifyModalContent}>
              <ReviewPage
                initialContent={selectedMarker.content}
                initialRating={selectedMarker.rating}
                closeModal={() => {
                  setIsModifyModalOn(false);
                  setSelectedMarker(null);
                }}
                onReviewSubmitted={() => {
                  loadRatedMarkers();
                }}
                address={selectedMarker.address ?? ''}
                kakaoPlaceId={selectedMarker.id}
                name={selectedMarker.placeName ?? ''}
                visitedDate={
                  selectedMarker.createdAt
                    ? new Date(selectedMarker.createdAt)
                    : new Date()
                }
              />
            </div>
          </>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Kakaomap;
