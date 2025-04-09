import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import LogIn from '../pages/LogIn'
import useRefreshToken from '../hooks/useRefreshToken'

const AppRoutes = () => {
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const refresh = async () => {
            try {
                await refreshToken();
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        }

        refresh();
    }, [ refreshToken ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes