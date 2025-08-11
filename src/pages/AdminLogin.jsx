import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminLogin() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    //from reset-password
    const location = useLocation()
    const {resetMessage} = location.state || {}

    const handleSignIn = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await fetch('http://localhost:9000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensures cookies are sent and received
                body: JSON.stringify({username, password}),
            })

            const data = await response.json();

            if (response.ok) {
                console.log('logged in successfully: ', data)

                //Redirect user based on their role
                if (data.role == 'CUSTOMER') {
                    navigate('/')
                } else if (data.role == 'ADMIN') {
                    navigate('/adminhome')
                }//  else {
                //     throw new Error('Invalid user role')
                // }
            } else {
                throw new Error(data.error || 'Login failed')
            }

        } catch (err) {
            setError(err.message)
        }
    }

  return (
    <div className="page-container admin-login">
        <div className="form-container">
            {resetMessage && <p className='reset-message'>{resetMessage}</p>}
            <h1 className="form-title">Admin Login</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignIn} className="form-content">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Admin Username</label>
                    <input type="text" className="form-input" id='username'
                        placeholder='Enter your admin username'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-input" id="password"
                        placeholder='Enter your password'
                        required
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className="form-button">Sign In</button>
            </form>
            <div className="form-footer">
                <a href="/fetch-email" className='form-link'>Forgot Password? Click here</a>
                <a href="/" className='form-link'>For Customer? Login here</a>
            </div>
        </div>
    </div>
  )
}
