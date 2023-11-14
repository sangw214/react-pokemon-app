import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import NotFound from './pages/NotFound'
import NavBar from './components/NavBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <br />
      <Outlet />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/pokemon/:id' element={<DetailPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
