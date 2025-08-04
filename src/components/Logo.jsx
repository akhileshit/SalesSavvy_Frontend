import React from 'react'
import logo from '../assets/logo.png'


export default function Logo() {
  return (
    <div >
        <a href="/customerhome" className='logos'>
          <img src={logo} alt="Logo" className='logo-image'/>
          <h3>SalesSavvy</h3>
        </a>
    </div>
  )
}
