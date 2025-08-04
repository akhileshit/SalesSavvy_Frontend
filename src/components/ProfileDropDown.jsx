import React, { useState } from 'react'
import User_avatar from '../assets/user_avatar.png'
import { useNavigate } from 'react-router-dom';

export default function ProfileDropDown({ username }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleLogout = async (e) => {
        try {
            const response = await fetch('http://localhost:9000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
        
            if (response.ok) {
                console.log('User successfully logged out')
                navigate('/') // Redirect to login page
            } else {
                console.error('Failed to log out');
            }
            
        } catch (error) {
            console.error('Error during logou:', error);
        }
    }

    const handleOrdersClick = () => {
        navigate('/userorderspage');
    }



  return (
    <div className="profile-dropdown">
        <button className='profile-button' onClick={toggleDropdown}>
            <img src={User_avatar} alt="User Avatar" className='user-avatar' onError={(e) => {e.target.src= 'fallback-logo.png'}}/>   {/* Add image */}
            <span className="username">{username || 'Guest'}</span> {/**Display username */}
        </button>
        {isOpen && (
            <div className="dropdown-menu">
                <a href="#">Profile</a>
                <a onClick={handleOrdersClick}>Orders</a>
                <button className='profile-button' onClick={handleLogout}>Logout</button>
            </div>
        )}
    </div>
  )
}
