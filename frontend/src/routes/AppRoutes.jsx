import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Landing from '../pages/Landing'
import LogIn from '../pages/LogIn'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Navbar from '../components/Navbar'
import useRefreshToken from '../hooks/useRefreshToken'

// Layout component that includes Navbar
const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

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
  }, [refreshToken]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes without Navbar */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LogIn />} />
        
        {/* Routes with Navbar */}
        <Route element={<NavbarLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/inventory" element={<div>Inventory Page</div>} />
          <Route path="/employers" element={<div>Employers Page</div>} />
          <Route path="/analytics" element={<div>Analytics Page</div>} />
          <Route path="/requests" element={<div>Requests Page</div>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes