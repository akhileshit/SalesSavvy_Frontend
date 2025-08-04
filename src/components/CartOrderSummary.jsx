import React, { useEffect, useState } from 'react'

export default function CartOrderSummary({totalCartItems, cartPrice, handleCheckout}) {   //omg this flower barcket is crucial for props
    const [subTotal, setSubTotal] = useState(0)
    const [finalTotal, setFinalTotal] = useState(0)
   
    useEffect(() => { // on change of cartPrice update subTotal
        setSubTotal(cartPrice)
    }, [cartPrice])

    useEffect(() => { // on change of subTotal update finalTotal
        calculateFinalTotal()
    }, [subTotal])

    const calculateFinalTotal = () => {
        let total = subTotal + 200
        setFinalTotal(total)
    }
    
  return (
    <div className='cart-order-summary'>
        <h2 className="summary-heading">Order Summary</h2>
        <div className="price-breakdown">
            <p className="sub-total between">Subtotal <span>₹{parseFloat(subTotal).toFixed(2)}</span></p>
            <p className="shipping-charges between">Shipping <span>₹200.00</span></p>
            <p className="total-products between">Total products <span>{totalCartItems}</span></p>
        </div>
        <div className="final-total between">
            Total <span>₹{parseFloat(finalTotal).toFixed(2)}</span>
        </div>
        
        <button className='checkout-button' onClick={() => handleCheckout(parseFloat(finalTotal).toFixed(2))}>Proceed to checkout</button>
        
    </div>
  )
}
