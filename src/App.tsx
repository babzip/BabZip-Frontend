import './App.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAOMAP_KEY
    }&autoload=false&libraries=services,clusterer`;
    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          console.log('Kakao Map SDK Loaded');
        });
      }
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
