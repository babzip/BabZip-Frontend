import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';

function OAuthRedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleMyInfo = async (accessToken: string) => {
    try {
      const response = await axios.get('https://babzip.duckdns.org/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('[사용자 정보]', response.data);
      useAuthStore.setState({
        isLoggedIn: true,
        name: response.data.data.name,
        restaurantCount: response.data.data.restaurantCount,
        averageRating: response.data.data.averageRating,
        provider: response.data.data.provider,
      });

      navigate('/', { replace: true });
    } catch (error) {
      console.error('[사용자 정보 요청 실패]', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      useAuthStore.setState({
        isLoggedIn: true,
      });
      handleMyInfo(accessToken);

      navigate('/', { replace: true });
    } else {
      console.error('토큰 없음');
    }
  }, [location, navigate]);

  return <div>로그인 중입니다...</div>;
}

export default OAuthRedirectPage;
