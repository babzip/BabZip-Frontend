import { create } from 'zustand';

type MarkerType = {
  lat: number;
  lng: number;
  id: string;
};

type MapStore = {
  center: {
    lat: number;
    lng: number;
  };
  marker: {
    lat: number;
    lng: number;
  } | null;
  markerList: MarkerType[];
  mapRef: React.MutableRefObject<kakao.maps.Map | null> | null;

  setCenter: (lat: number, lng: number) => void;
  setMarker: (lat: number | null, lng?: number) => void;
  setMapRef: (ref: React.MutableRefObject<kakao.maps.Map | null>) => void;

  addMarker: (marker: MarkerType) => void;
  removeMarker: (id: string) => void;
  clearMarkers: () => void;
};

export const useMapStore = create<MapStore>((set) => ({
  center: {
    lat: 33.450701,
    lng: 126.570667,
  },
  marker: null,
  markerList: [],
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

  addMarker: (marker) =>
    set((state) => {
      const exists = state.markerList.find((m) => m.id === marker.id);
      if (exists) return state;
      return {
        markerList: [...state.markerList, marker],
      };
    }),

  removeMarker: (id) =>
    set((state) => ({
      markerList: state.markerList.filter((m) => m.id !== id),
    })),

  clearMarkers: () => set({ markerList: [] }),
}));
