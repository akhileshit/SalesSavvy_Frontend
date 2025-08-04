import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CategoryNavigation from '../components/CategoryNavigation'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [username, setUsername] = useState('')
  const [cartError, setCartError] = useState(false) // State for cart fetch error
  const [isCartLoading, setIsCartLoading] = useState(true) // State for cart loading



  useEffect(() => {
    fetchProducts();
    if (username) {
      fetchCartCount(); // Fetch cart count only if username is available
    }
  }, [username]) // Re-run cart count fetch & products fetch if username changes

  const fetchProducts = async (category = '') => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/products${category ? `?category=${category}` : `?category=Shirts`}`,
        { credentials: 'include' } // Include authToken as a cookie
      )

      const data = await response.json();
      if (data) {
        setUsername(data.user?.name || 'Guest') // Extract username
        setProducts(data.products || [])
      } else {
        setProducts([])
      }

    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } 
  }

  const fetchCartCount = async () => {
    setIsCartLoading(true)  // Set loading state
    try {
      const response = await fetch('http://localhost:9000/api/cart/total-cout', {
        credentials: "include", // Include authToken as a cookie
      })
      const count = await response.json();
      setCartCount(count);
      setCartError(false); // Reset error state if successful
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true); // Set error state
    } finally {
      setIsCartLoading(false); // Remove loading state
    }
  }

  const handleCategoryClick = (category) => {
    fetchProducts(category);
  }

  const handleAddToCart = async (productId) => {
    if (!username) {
      console.error('Username is required to add items to the cart');
      return;
    }
    try {
      const response = await fetch('http://localhost:9000/api/cart/add', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, productId }), // Include username and productId in the request
        headers: {'Content-Type': 'application/json' }, 
      })

      if (response.ok) {
        fetchCartCount(); // Update cart count
      } else {
        console.error('FAiled to add product ot cart');
      }

    } catch (error) {
      console.error('Error adding product to cart:', error)
    }
  }


  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        username={username}
      />
      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </nav>
      <main className="main-content">
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  )
}  
