import type { AuthStore } from './AuthStore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          name: null,
          restaurantCount: null,
          averageRating: null,
          picture: null,
        }),
      name: null,
      setName: (name: string) => set({ name: name }),
      restaurantCount: null,
      setRestaurantCount: (count: number) => set({ restaurantCount: count }),
      averageRating: null,
      setAverageRating: (rating: number) => set({ averageRating: rating }),
      provider: null,
      setProvider: (provider: string) => set({ provider: provider }),
      picture: null,
      setPicture: (url: string) => set({ picture: url }),
    }),
    { name: 'localStorage' }
  )
);
