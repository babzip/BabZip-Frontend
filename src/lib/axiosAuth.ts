import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '../store/useAuthStore';

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponse = {
  success: string | boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const refreshPath = '/auth/token/refresh';

let initialized = false;
let refreshPromise: Promise<string | null> | null = null;

const clearAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  useAuthStore.getState().logout();
};

const requestTokenRefresh = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!accessToken || !refreshToken) {
    clearAuth();
    return null;
  }

  try {
    const response = await axios.post<RefreshResponse>(
      `${apiUrl}${refreshPath}`,
      {
        accessToken,
        refreshToken,
      }
    );

    const newAccessToken = response.data?.data?.accessToken;
    const newRefreshToken = response.data?.data?.refreshToken;
    if (!newAccessToken || !newRefreshToken) {
      clearAuth();
      return null;
    }

    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return newAccessToken;
  } catch (err) {
    console.error('[토큰 재발급 실패] :', err);
    clearAuth();
    return null;
  }
};

export const setupAxiosAuthInterceptor = () => {
  if (initialized) return;
  initialized = true;

  axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const isRefreshRequest = config.url?.includes(refreshPath);
    if (isRefreshRequest) return config;

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryConfig | undefined;
      const status = error.response?.status;
      const isRefreshRequest = originalRequest?.url?.includes(refreshPath);

      if (!originalRequest || status !== 401 || originalRequest._retry || isRefreshRequest) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = requestTokenRefresh().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;
      if (!newAccessToken) {
        return Promise.reject(error);
      }

      const retryConfig: AxiosRequestConfig = {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      };

      return axios(retryConfig);
    }
  );
};

setupAxiosAuthInterceptor();
