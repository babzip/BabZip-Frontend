import { create } from 'zustand';

type MapStore = {
  center: {
    lat: number;
    lng: number;
  };
  marker: {
    lat: number;
    lng: number;
  } | null;
  mapRef: React.MutableRefObject<kakao.maps.Map | null> | null;
  setCenter: (lat: number, lng: number) => void;
  setMarker: (lat: number | null, lng?: number) => void;
  setMapRef: (ref: React.MutableRefObject<kakao.maps.Map | null>) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  center: {
    lat: 33.450701,
    lng: 126.570667,
  },
  marker: null,
  mapRef: null,
  setCenter: (lat, lng) =>
    set(() => ({
      center: { lat, lng },
    })),
  setMarker: (lat, lng) =>
    set(() => ({
      marker: lat === null ? null : { lat, lng: lng! },
    })),
  setMapRef: (ref) => set(() => ({ mapRef: ref })),
}));
