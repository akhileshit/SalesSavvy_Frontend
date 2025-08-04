import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ValidateOtp() {
    const location = useLocation()
    const {sentMessage, resetId} = location.state || {}
    const [error, setError] = useState(null)
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
           
            const response = await fetch('http://localhost:9000/api/password-reset/validate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({otp, resetId})
            })
            const data = await response.json()
            
            if (response.ok) {
                navigate('/reset-password', {
                    state: {
                        validMessage: data.message, 
                        resetId: data.resetId
                    }
                })
            } else {
                throw new Error(data.error || 'Something went wrong')
            }

        } catch (err) {
            setError(err.message)
        }
    }

  return (
    <div className='page-container'>
        <div className="form-container">
            {sentMessage && <p className='otp-message'>{sentMessage}</p>} 
            <form onSubmit={handleOnSubmit} className="form-content">
                {error && <p className='error-message'>{error}</p>}
                <div className="form-group">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input type="text" className="form-input" id='otp'
                        placeholder='Enter otp here..'
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <button className="form-button">Submit</button>
            </form>
        </div>
    </div>
  )
}
