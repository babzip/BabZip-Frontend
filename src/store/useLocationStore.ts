import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LocationState = {
  lat: number;
  lng: number;
  setLocation: (lat: number, lng: number) => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      lat: 0,
      lng: 0,
      setLocation: (lat, lng) => set({ lat, lng }),
    }),
    {
      name: 'location-storage',
    }
  )
);
