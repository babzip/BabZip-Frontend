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
  setCenter: (lat: number, lng: number) => void;
  setMarker: (lat: number, lng: number) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  center: {
    lat: 33.450701,
    lng: 126.570667,
  },
  marker: null,
  setCenter: (lat, lng) =>
    set(() => ({
      center: { lat, lng },
    })),
  setMarker: (lat, lng) =>
    set(() => ({
      marker: { lat, lng },
    })),
}));
