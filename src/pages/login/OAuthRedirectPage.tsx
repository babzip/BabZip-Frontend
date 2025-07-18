import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

function OAuthRedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/', { replace: true });
    } else {
      console.error('토큰 없음');
    }
  }, [location, navigate]);

  return <div>로그인 중입니다...</div>;
}

export default OAuthRedirectPage;
