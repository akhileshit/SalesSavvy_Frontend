import React, { useEffect, useState } from 'react'

export default function AdminProductMgmt({ operation }) {
  const [isDelete, setIsDelete] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [productId, setProductId] = useState(0)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    setError(null) // Clear any errors or messages if operation changes
    setMessage(null)

    if (operation === 'ADD') { 
      setIsDelete(false);
      setIsAdd(true); 
    }
    else if (operation === 'DELETE') { 
      setIsAdd(false);
      setIsDelete(true); 
    }
  }, [operation])

  const addProduct = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('http://localhost:9000/admin/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        body: JSON.stringify({ name, description, price, stock, categoryId, imageUrl })
      })
      setName(''); setDescription(''); setPrice(0); setStock(0); setCategoryId(0); setImageUrl(''); // Clear input fields
      const data = await response.json()

      if (response.status === 201) {
        console.log("Product added successfully.")
        setMessage("Product added successfully.")
        // still "data" is there. use it later...........
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      console.log(err.message)
      setError(err.message)
    }
  }

  const deleteProduct = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('http://localhost:9000/admin/products/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      })
      setProductId(0)  // Clear input fields
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        setMessage(data.message)
      } else {
        throw new Error(data.error)
      }

    } catch (err) {
      console.log(err.message)
      setError(err.message)
    }
  }
  return (
    <div className='product-management-page'>
      {isAdd &&
        <div className="form-container admin-form">
          <form onSubmit={addProduct} className="form-content">
            <h1 className="form-header">ADD PRODUCT</h1>
            {error && <span className='error-message'>{error}</span>}
            {message && <span className='message'>{message}</span>}
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className='form-input' id='name'
                placeholder='Enter product name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className='form-input' id='description'
                placeholder='Enter product description'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="number" className='form-input' id='price'
                placeholder='Enter product price'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input type="number" className='form-input' id='stock'
                placeholder='Enter product stock'
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryId" className="form-label">Category Id</label>
              <input type="number" className='form-input' id='categoryId'
                placeholder='Enter product categoryId'
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl" className="form-label">Image Url</label>
              <input type="text" className='form-input' id='imageUrl'
                placeholder='Enter product imageUrl'
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <button className="form-button">ADD</button>
          </form>
        </div>
      }
      {isDelete &&
        <div className="form-container admin-form">
          <form onSubmit={deleteProduct} className="form-content">
            <h1 className="form-header">DELETE PRODUCT</h1>
            {error && <span className='error-message'>{error}</span>}
            {message && <span className='message'>{message}</span>}
            <div className="form-group">
              <label htmlFor="productId" className="form-label">Product Id</label>
              <input type="text" className='form-input' id='productId'
                placeholder='Enter product id'
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <button className="form-button">DELETE</button>
          </form>
        </div>
      }
    </div>
  )
}
