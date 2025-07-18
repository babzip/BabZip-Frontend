export type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  name: string | null;
  restaurantCount: number | null;
  averageRating: number | null;
  provider: string | null;
};
