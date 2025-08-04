import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Dashboard from './pages/Dashboard'
import FetchEmail from './pages/FetchEmail'
import ValidateOtp from './pages/ValidateOtp'
import ResetPassword from './pages/ResetPassword'
import Cart from './pages/Cart'
import Orders from './pages/Orders'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/customerhome" element={<Dashboard/>} />
        <Route path="/fetch-email" element={<FetchEmail/>} />
        <Route path="/valid-otp" element={<ValidateOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path='/usercartpage' element={<Cart/>}/>
        <Route path='/userorderspage' element={<Orders/>} />
        {/* Add more routes here as the app grows */}
    </Routes>
  )
}
