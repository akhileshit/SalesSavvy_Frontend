import React, { useState } from 'react'
import '../assets/styles.css'

export default function Registration() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState(null)

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null) // clear previous errors

        try {
            const response = await fetch('http://localhost:9000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, email, password, role}),
            })

            const data = await response.json()

            if (response.ok) {
                console.log('User registered successfully', data)
                //Redirect to login page
                window.location.href = '/' 
            }
            else {
                throw new Error(data.error || 'Registration failed')
            } 
        } catch (err) {
            setError(err.message) 
        }
    }


  return (
    <div className="page-container">
        <div className='form-container'>
            <h1 className='form-title'>Register</h1>
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleSignUp} className='form-content'>
                <div className='form-group'>
                    <label htmlFor="username" className='form-label'>Username</label>
                    <input type="text" id='username' className='form-input' 
                        placeholder='Enter your username' 
                        required 
                        value = {username} 
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" id='email' className='form-input'
                        placeholder='Enter your email'
                        required
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" id='password' className='form-input'
                        placeholder='Enter your password'
                        required
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role" className='form-label'>Role</label>
                    <select id="role" className='form-select'
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" disabled selected>Select your role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="CUSTOMER">CUSTOMER</option>
                    </select>
                </div>
                <button  className='form-button'>Sign Up</button>
            </form>
            <p className="form-footer">
                Already a user?{' '}
                <a href="/" className='form-link' >Log in here</a>
            </p>
        </div>
    </div>
  )
}
