import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DetailPage from './pages/detail/DetailPage';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import MylistPage from './pages/mylist/MylistPage';
import NotfoundPage from './pages/notfound/NotfoundPage';
import ReviewPage from './pages/review/ReviewPage';
import { Suspense } from 'react';

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/detail' element={<DetailPage />} />
                    <Route path='/review' element={<ReviewPage />} />
                    <Route path='/mylist' element={<MylistPage />} />
                    <Route path='*' element={<NotfoundPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
