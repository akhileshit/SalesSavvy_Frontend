import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import place from '../assets/logo.png'

export default function () {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [cartCount, setCartCount] = useState(0)
    const [username, setUsername] = useState('')
    const [cartError, setCartError] = useState(false)
    const [isCartLoading, setIsCartLoading] = useState(true)

    useEffect(() => {
      fetchOrders()
      if (username) {
        fetchCartCount();
      }
    }, [username])

    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/orders", {
          credentials: "include"
        })
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json()
        setOrders(data.products || [])
        setUsername(data.username || 'Guest')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false) // Reset loading state if fetched
      }
    }

    const fetchCartCount = async () => {
      setIsCartLoading(true)
      try {
        const response = await fetch("http://localhost:9000/api/cart/total-count", {
          credentials: 'include',
        })
        const count = await response.json()
        setCartCount(parseInt(count))
        setCartError(false)  // Reset error state if successful
      } catch (error) {
        console.error("Error fetching cart count:", error)
        setCartError(true) // Set error state
      } finally {
        setIsCartLoading(false) // Remove loading state
      }
    }

  return (
    <div className='maindiv'>
      <div className="customer-homepage">
        <Header
          cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
          username={username}
        />
        <main className="main-content">
          <h1 className="form-title">Your Orders</h1>
          {loading && <p>Loading orders...</p>}
          {error && <p className='error-message'>{error}</p>}
          {!loading && !error && orders.length === 0 && (
            <p>No orders found. Start shopping now!</p>
          )}
          {!loading && !error && orders.length > 0 && (
            <div className="orders-list">
              {orders.map((order, index) => (
                <div key={index} className="order-card">
                  <div className="order-card-header">
                    <h3>Order Id : {order.orderId}</h3>
                  </div>
                  <div className="order-card-body">
                    <img 
                      className='order-product-image'
                      src= {order.imageUrl}
                      alt= {order.productName} 
                      onError={(e) => e.target.src = place}
                    />
                    <div className="order-details">
                      <h3 className="product-name">ProductName : {order.productName}</h3>
                      <h3>Description : {order.description}</h3>
                      <h3>Quantity : {order.quantity}</h3>
                      <h3>Price per unit : ₹{order.pricePerUnit.toFixed(2)}</h3>
                      <h3>Total Price : ₹{order.totalPrice.toFixed(2)}</h3>
                      <h3>Order Date : {order.orderDateTime}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}
