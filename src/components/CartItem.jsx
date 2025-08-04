import React, { useEffect, useState } from 'react'
import place from '../assets/logo.png'
import del from '../assets/delete.jpg'

export default function CartItem({products, updQuantity, deleteCartItem}) {
    if (products.length === 0) {
        return <p>Your cart is empty. Add some products</p>
    }
  return (
      <div className='cart-items-list'>
        {products.map((product) => (
            <div key={product.product_id} className="cart-item-card">
                <img src={product.image_url} alt="Product-image" className='cart-item-image' 
                    onError={(e) => {
                        e.target.src = place
                    }}
                    />
                <div className="cart-item-details">
                    <span className='cart-item-name'>{product.name}</span>
                    <span className='cart-item-description'>{product.description}</span>
                </div>
                <div className='cart-item-quantity-update'>
                    <button className="cart-item-quantity-dec cart-item-button" onClick={(e) => updQuantity(e.target.textContent, product.product_id, product.quantity)}>-</button>
                    <span className='cart-item-quantity'>{product.quantity}</span>
                    <button className="cart-item-quantity-inc cart-item-button" onClick={(e) => updQuantity(e.target.textContent, product.product_id, product.quantity)}>+</button>
                </div>
                <span className="cart-item-price">₹{parseFloat(product.total_price).toFixed(2)}</span>
                <img src={del} alt="delete-icon" className="cart-item-delete" onClick={() => deleteCartItem(product.product_id)}/>
            </div>
        ))}
        </div>
  )
}
