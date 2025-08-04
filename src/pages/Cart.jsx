import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import Footer from '../components/Footer'
import Header from '../components/Header'
import backArrowImg from "../assets/back-arrow.png"
import CartOrderSummary from '../components/CartOrderSummary'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
    const [products, setProducts] = useState([])
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [error, setError] = useState(null)
    const [itemQuantity, setItemQuantity] = useState(false) //
    const [cartCount, setCartCount] = useState(0)
    let navigate = useNavigate()

    useEffect(() => {
        fetchCartItems()
    }, [username, itemQuantity])  //////

    useEffect(() => {
        getCartCount()
    }, [cartCount, itemQuantity]) 

    const fetchCartItems = async () => {
        setError(null)

        try {
            const response = await fetch('http://localhost:9000/api/cart/items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })


            const data = await response.json()

            if (response.ok) {
                setProducts(data.cart.products)
                setTotalCartPrice(data.cart.overall_total_price)
                setUsername(data.username)
            } else {
                throw new Error('Failed to fetch cart items')
            }
            
            
        } catch (err) {
            setError(err.message)
            if (err.message === 'Failed to fetch') {
                window.location.href = '/'
            }
        }
    }

    const updateQuantity = async (operation, productId, quantity) => {
        if (operation === '+') {
            quantity++
        } else {
            quantity--
        }

        try {
            const response = await fetch('http://localhost:9000/api/cart/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({username, productId, quantity})
            })

            //const data = await response.json()

            if (response.ok) {
                setItemQuantity(!itemQuantity) //toggle (to re-render)
                console.log("Quantity updated")
            } else {
                throw new Error('Quatity updation failed')
            }


        } catch (err) {
            setError(err.message)
        }
    }

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

  const deleteCartItem = async (productId) => {
    try {
        const response = await fetch('http://localhost:9000/api/cart/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({username, productId})
        })

        if (response.status === 204) {
            setItemQuantity(!itemQuantity) //toggle (to re-render)
            console.log('Cart item deleted.')
        }
    } catch (err) {
        setError(err.message)
    }
  }

  //Handle Checkout---------------------------------------------------------
  const handleCheckout = async (finalTotal) => {
    try {
        const requestBody = {
            totalAmount: finalTotal,
            cartItems: products.map((item) => ({
                productId: item.product_id,
                quantity: item.quantity,
                price: item.price_per_unit,
            })),
        }

        //Create Razorpay order via backend
        const response = await fetch('http://localhost:9000/api/payment/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(requestBody),
        })

        if (!response.ok) throw new Error(await response.text())
        const razorpayOrderId = await response.text();

        //Configure Razorpay checkout options
        const options = {
            key: "rzp_test_SEv3bRLUe7sQfu",
            amount: finalTotal * 100,
            currency: "INR",
            name: "SalesSavvy",
            description: "Test Transaction",
            order_id: razorpayOrderId,
            handler: async function (response){
                try {
                   //Payment success, verify on backend
                   console.log(response)
                   const verifyResponse = await fetch('http://localhost:9000/api/payment/verify', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    })
                   }) 
                   const result = await verifyResponse.text();
                   if(verifyResponse.ok) {
                    alert("Payment verified successfully!")
                    navigate("/customerhome")
                   } else {
                    alert("Payment verification failed: " + result)
                   }
                } catch (err) {
                    setError(err.message)
                    console.error("Error verifying payment:", err)
                    alert("Payment verification failed. Please try again.")
                }
            },
            prefill: {
                name: username,
                email: "test@example.com",
                contact: "9999999999",
            },
            theme: {
                color: '#3399cc',
            }
        }

        //Initialize Razorpay and open the payment interface
        const rzp = new window.Razorpay(options)
        rzp.open();

    } catch (err) {
        setError(err.message)
        alert("Payment failed. Please try again.")
        console.error("Error during checkout:", err)
    }
  }
  //----------------------------------------------------------------------
    
  // UI for empty cart!
    if (products.length === 0) {
        return (
        <div className="empty-cart">
            <Header cartCount={cartCount} username={username}/>
            {error && <p className='error-message'>{error}</p>}
            <div className="empty-cart-details">
                <a href="/customerhome" className='cart-leave-home' ><img src={backArrowImg} alt="home" />Go back to shopping</a>
                <p className='empty-cart-message'>Your cart is empty. Add some products</p>
            </div>
            <Footer/>
        </div>
        )
    }

  return (
    <div className='cart-class'>
        <Header cartCount={cartCount} username={username}/>
        <div className="cart-details">
            <a href="/customerhome" className='cart-leave-home'><img src={backArrowImg} alt="home" />Continue Shopping</a>
            <h2 className="cart-name">Shopping Cart</h2>
            <p className="cart-items-count">You have {products.length} items in your cart</p>
            {error && <p className='error-message'>{error}</p>}
            <div className="cart-item">
                <CartItem 
                    products={products} 
                    updQuantity={(operation, productId, quantity) => updateQuantity(operation, productId, quantity)} 
                    deleteCartItem={(productId) => deleteCartItem(productId)}
                />
            </div>
            <div className="cart-summary">
                <CartOrderSummary totalCartItems={cartCount} cartPrice={totalCartPrice} handleCheckout={(finalTotal) => handleCheckout(finalTotal)}/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
