import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CategoryNavigation from '../components/CategoryNavigation'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [error, setError] = useState(null)
  const [username, setUsername] = useState(null);
  const [products, setProducts] = useState([])
  let navigate = useNavigate()
  // const [category, setCategory] = useState('Shirts')
  const [cartCount, setCartCount] = useState(0)


  // Use this if u want anything to load by default when page reloads [and also to avoid infinite/"multiple" re-rendering!!!]  i think
  useEffect(() => {
    fetchProducts()    //stops calling this when username gets a value!!  i think
  }, [username])


  useEffect(() => {
    getCartCount()
  }, [cartCount])



  //CATEGORY CHANGE FUNCTION
  const onCategoryClick = (category) => {
    fetchProducts(category)
  }


  //PRODUCTS FETCH FUNCTION
  const fetchProducts = async (category = 'Shirts') => {
    setError(null)

    try {
      const response = await fetch(`http://localhost:9000/api/products?category=${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensures cookies are sent and received

      })

      const data = await response.json()

      if (response.ok) {
        console.log("Response is good")
        setUsername(data.user.name)
        console.log(username)
        setProducts(data.products)
      } else {
        throw new Error(data.error || 'Products retrieval failed')
      }

    } catch (err) {
      console.log("Error fetching products.")
      setError(err)
      console.log(err.message)
      if (err.message === 'Failed to fetch') {
        navigate('/')
      }
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

  //ADD TO CART FUNCTION
  const onAddToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:9000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, productId })
      })

      // const data = await response.json()

      if (response.status == 201) {
        getCartCount()

      } else {
        throw new Error('Add to cart failed')
      }

    } catch (err) {
      setError(err.message)
    }
  }

  


  return (
    <div className="customer-homepage">
      <Header cartCount={cartCount} username={username} />

      <nav className="navigation">
        <CategoryNavigation onCategoryClick={onCategoryClick} />
        {error && <p className="error-message">Error: {error}</p>}
      </nav>


      <main className="main-content">
        <ProductList products={products} onAddToCart={(productId) => onAddToCart(productId)} />
      </main>

      <Footer />
    </div>
  )
}  
