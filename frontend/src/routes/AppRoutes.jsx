import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Landing from '../pages/Landing'
import LogIn from '../pages/LogIn'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Navbar from '../components/Navbar'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import SignUp from '../pages/SignUp'
import Request from '../pages/Request'
import Employers from '../pages/Employers'

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
  const { accessToken } = useAuth();

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
        {
          !accessToken ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to={'/'} />} />
            </>
          ) : (
            <Route element={<NavbarLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<div>Inventory Page</div>} />
              <Route path="/analytics" element={<div>Analytics Page</div>} />
              <Route path="/employers" element={<Employers/>} />
              <Route path="/requests" element={<Request/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="*" element={<Navigate to={'/'} />} />
            </Route>
          )
        }
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes