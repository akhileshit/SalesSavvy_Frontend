import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FetchEmail() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
    const [sentMessage, setSentMessage] = useState('')
    const [resetId, setResetId] = useState(0)
    const [waitMsg, setWaitMsg] = useState('')
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            setWaitMsg("Please wait..Validating the email and sending the otp")

            const response = await fetch('http://localhost:9000/api/password-reset/fetch-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            })
            const data = await response.json()

            if (response.ok) {
                //don't set and send immediately like this!
                setSentMessage(data.message)
                setResetId(data.resetId)
                //passing data through navigate!
                navigate('/valid-otp', {
                    state: {
                        "sentMessage": data.message,
                        "resetId": data.resetId
                    }
                })
            } else {
                throw new Error(data.error || "Failed to fetch email")
            }

        } catch (err) {
            setError(err.message)
        }
    }

  return (
    <div className="page-container">
        <div className="form-container">
            <form onSubmit={handleSubmit} className='form-content'>
                {error && <p className='error-message'>{error}</p>}
                <div className="form-group">
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input type="email" className='form-input' id='email' 
                        placeholder='Enter your email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className='form-button'>Submit</button>
                {!error && waitMsg && <p className='wait-message'>{waitMsg}</p>}
            </form>
        </div>
    </div>
  )
}
