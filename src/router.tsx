import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import DetailPage from './pages/detail/DetailPage';
import Kakaomap from './pages/map/Kakaomap';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import MylistPage from './pages/mylist/MylistPage';
import NotfoundPage from './pages/notfound/NotfoundPage';
import ReviewPage from './pages/review/ReviewPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 지도 바탕을 사용하는 페이지들 */}
      <Route path='/' element={<Kakaomap />}>
        <Route index element={<MainPage />} />
        <Route path='/detail' element={<DetailPage />} />
        <Route path='/review' element={<ReviewPage />} />
        <Route path='*' element={<NotfoundPage />} />
      </Route>

      {/* 지도 바탕이 필요없는 페이지들*/}
      <Route path='/mylist' element={<MylistPage />} />
      <Route path='/login' element={<LoginPage />} />
    </>
  )
);
