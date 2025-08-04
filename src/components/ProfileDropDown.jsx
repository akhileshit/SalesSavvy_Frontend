import React, { useState } from 'react'
import User_avatar from '../assets/user_avatar.png'

export default function ProfileDropDown({ username }) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleLogout = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await fetch('http://localhost:9000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
    
            const data = await response.json()
    
            if (response.ok) {
                console.log(data.message)
                console.log('User logged out')  
                window.location.href = '/'
            } else {
                throw new Error(data.error || 'Something went wrong')
            }
            
        } catch (err) {
            setError(err.message)
        }
    }



  return (
    <div className="profile-dropdown">
        <button onClick={toggleDropdown}>
            <img src={User_avatar} alt="User Avatar" className='avatar'/>   {/* Add image */}
            <span className="username">{username || 'Guest'}</span>
        </button>
        {isOpen && (
            <div className="dropdown-menu">
                <a href="#">Profile</a>
                <a href="/userorderspage">Orders</a>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )}
    </div>
  )
}
