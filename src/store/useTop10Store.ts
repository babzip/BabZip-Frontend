import { create } from 'zustand';

export interface RankingDataType {
  rankValue: number;
  restaurantName: string | null;
  address: string | null;
}

interface Top10Store {
  rankData: RankingDataType[];
  setRankData: (data: RankingDataType[]) => void;
  updateRank: (rank: number, name: string, address: string) => void;
  clearRank: (rank: number) => void;
}

export const useTop10Store = create<Top10Store>((set) => ({
  rankData: [],
  setRankData: (data) => set({ rankData: data }),
  updateRank: (rank, name, address) =>
    set((state) => ({
      rankData: state.rankData.map((item) =>
        item.rankValue === rank
          ? { ...item, restaurantName: name, address }
          : item
      ),
    })),
  clearRank: (rank) =>
    set((state) => ({
      rankData: state.rankData.map((item) =>
        item.rankValue === rank
          ? { ...item, restaurantName: null, address: null }
          : item
      ),
    })),
}));
