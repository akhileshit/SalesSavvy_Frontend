import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'


export default function Logo() {
  const navigate = useNavigate();


  return (
    <div className='logo-container' onClick={() => navigate('/customerhome')}>
          <img src={logo} alt="SalesSavvy Logo" className='logo-image'/>
          <span className='logo-text'>SalesSavvy</span>
    </div>
  )
}
