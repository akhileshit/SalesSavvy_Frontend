import React from 'react'
import place from '../assets/logo.png'

export default function OrderList({orders}) {
    if (orders.length === 0) {
        return "No orders made yet!"
    }
  return (
    <div className='order-list'>
        {orders.map((order) => (
            <div  className="order-item-card">
                <h3 className="order-item-id">Order #{order.orderId}</h3>
                <div className="order-details">
                    <div className="order-details-image">
                        <img className="order-item-image" src={order.imageUrl} alt='product-image' onError={(e) => e.target.src = place}/>
                    </div>
                    <div className="order-details-text">
                        <h4 className="order-item-name">Product Name:  {order.productName}</h4>
                        <p className="order-item-description"><b>Product Description:</b>  {order.description}</p>
                        <p className="order-item-price"><b>Product Price:</b>  ₹{order.pricePerUnit}</p>
                        <p className="order-item-quantity"><b>Quantity Purchased:</b>  {order.quantity}</p>
                        <p className="order-item-total-price"><b>Total Price:</b>  ₹{order.totalPrice}</p>
                        <p className="order-item-data-time"><b>Order Date & Time:</b>  {order.orderDateTime}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}
