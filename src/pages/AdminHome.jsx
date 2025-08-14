import React, { useState } from 'react'
import AdminProductMgmt from '../components/AdminProductMgmt'

export default function AdminHome() {
  const [operation, setOperation] = useState('')
  const [isClosed, setIsClosed] = useState(true)

  const handleOnAdd = (e) => {
    e.preventDefault()
    setIsClosed(false)
    setOperation('ADD')
  }
  const handleOnDelete = (e) => {
    e.preventDefault()
    setIsClosed(false)
    setOperation('DELETE')
  }
  const handleClose = (e) => {
    e.preventDefault()
    setIsClosed(true)
  }

  return (
    <div className='admin-homepage'>
      <div className="management-section">
        <h1 className="section-header"><span>Product Management</span></h1>
        <div className="admin-cards">
          <div className="admin-card">
            <div className="card-title">Add Product</div>
            <p className="card-description">Add product to the database</p>
            <button className="card-button" onClick={handleOnAdd}>Enter Product Details</button>
          </div>
          <div className="admin-card">
            <div className="card-title">Delete Product</div>
            <p className="card-description">Delete product from the database</p>
            <button className="card-button" onClick={handleOnDelete}>Enter Product Details</button>
          </div>
        </div>
        {operation && !isClosed &&
          <div className="admin-product-mgmt-page">
            <button className="close-button" onClick={handleClose}>Close</button>
            <AdminProductMgmt operation={operation}/>
          </div>
        }
      </div>
    </div>
  )
}
