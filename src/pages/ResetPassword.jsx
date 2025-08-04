import {React, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const location = useLocation()
    const {validMessage, resetId} = location.state || {}
    const [error, setError] = useState(null)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await fetch('http://localhost:9000/api/password-reset/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({newPassword, confirmPassword, resetId})
            })

            const data = await response.json()

            if (response.ok) {
                navigate('/', {
                    state: {
                        resetMessage: data.message
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
            {validMessage && <p className='validate-message'>{validMessage}</p>}
            <form onSubmit={handleOnSubmit} className="form-content">
                {error && <p className='error-message'>{error}</p>}
                <div className="form-group">
                    <label htmlFor="newPwd" className="form-label">New Password</label>
                    <input type="text" className="form-input" id='newPwd'
                        placeholder='Enter new password'
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPwd" className="form-label">Confirm Password</label>
                    <input type="text" className="form-input" id='confirmPwd'
                        placeholder='Confirm password'
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button className="form-button">Submit</button>
            </form>
        </div>
    </div>
  )
}
