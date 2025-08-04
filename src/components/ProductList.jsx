import React from 'react'
import place from '../assets/logo.png'

export default function ProductList({ products, onAddToCart }) {
    if (products.length === 0) {
        return <p>No products available.</p>
    }
  return (
    <div className="product-list">
        <div className="product-grid">
            {products.map( (product) => (
                <div key={product.product_id} className="product-card">
                    <img 
                        className='product-image'
                        src={product.images[0]} 
                        alt={product.name} 
                        loading='lazy'
                        onError={(e) => {
                            e.target.src = place
                        }}
                    />
                    <div className="product-info">
                        <h3 className='product-name'>{product.name}</h3>
                        <p className='product-description'>{product.description}</p>
                        <p className='product-price'>₹{product.price}</p>
                        <button className='add-to-cart-btn' onClick={() => onAddToCart(product.product_id)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
