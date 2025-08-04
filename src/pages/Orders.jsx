import React, { useEffect, useState } from 'react'
import OrderList from '../components/OrderList'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function () {
    const [orders, setOrders] = useState([])
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [cartCount, setCartCount] = useState(0)
    const [error, setError] = useState(null)
    // orders.sort(orders.map((order) => order.orderDateTime))
    useEffect(() => {
        fetchOrders()
    }, [username])

    useEffect(() => {
        getCartCount()
    }, [cartCount])

    const fetchOrders = async () => {
        setError(null)

        try {
            const response = await fetch('http://localhost:9000/api/orders', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            })
    
            const data = await response.json()
    
            if (response.ok) {
                console.log("Orders fetched successfully.")
                setOrders(data.products)
                setRole(data.role)
                setUsername(data.username)
            } else {
                throw new Error(data.error)
            }
        } catch (err) {
            setError(err.message)
        }
    }

    //TOTAL CART ITEMS FUNCTION
  const getCartCount = async () => {
    const response = await fetch('http://localhost:9000/api/cart/total-count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const countData = await response.json()
    setCartCount(parseInt(countData))
  }


  return (
    <div className='orders-page-container'>
        <Header cartCount={cartCount} username={username}/>
        <OrderList orders={orders}/>
        <Footer />
    </div>
  )
}
