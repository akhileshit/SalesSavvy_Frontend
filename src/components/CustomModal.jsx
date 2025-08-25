import React, { useState } from 'react'
import place from '../assets/logo.png'

export default function CustomModal({ modalType, onClose, onSubmit, response }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
        imageUrl: '',
    });

    const [inputValue, setInputValue] = useState("") //Generalized input for all cases

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleGeneralInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        switch (modalType) {
            case "addProduct": {
                const processedData = {
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock, 10),
                    categoryId: parseInt(formData.categoryId, 10),
                }
                onSubmit(processedData);
                break;
            }
            case "deleteProduct": {
                const productId = parseInt(inputValue, 10);
                onSubmit({ productId });
                break;
            }
            case "viewUser": {
                const userId = parseInt(inputValue, 10);
                onSubmit({ userId });
                break;
            }
            case "modifyUser": { //////////////////////////////////////////////////
                const formData = new FormData(e.target);
                const username = formData.get('username')
                const email = formData.get('email')
                const role = formData.get('role')
                const userId = parseInt(inputValue, 10)
                const data = { username, }
                onSubmit(userId);
                break;
            }
            case "monthlyBusiness": {
                const month = formData.month;
                const year = formData.year
                onSubmit({ month, year });
                break;
            }
            default:
                break;
        }
    }
    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                {/* Add Product Form  */}
                {modalType === "addProduct" &&
                    (
                        !response ? (
                            <>
                                <h2>Add Product</h2>
                                <form className="modal-form">
                                    <div className="modal-form-item">
                                        <label htmlFor="name" className="name">Name: </label>
                                        <input type="text" id='name'
                                            name='name'
                                            placeholder='Name'
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="modal-form-item">
                                        <label htmlFor="price">Price: </label>
                                        <input type="number" id='price'
                                            name='price'
                                            placeholder='Price'
                                            value={formData.price}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="modal-form-item">
                                        <label htmlFor="stock">Stock:</label>
                                        <input type="number" name="stock" id="stock"
                                            placeholder='Stock'
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="modal-form-item">
                                        <label htmlFor="categoryId">Category ID:</label>
                                        <input
                                            type="number"
                                            id="categoryId"
                                            name="categoryId"
                                            placeholder="Category ID"
                                            value={formData.categoryId}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="modal-form-item">
                                        <label htmlFor="imageUrl">Image URL:</label>
                                        <input
                                            type="text"
                                            id="imageUrl"
                                            name="imageUrl"
                                            placeholder="Image URL"
                                            value={formData.imageUrl}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="modal-form-item">
                                        <label htmlFor="description">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            placeholder="Description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                </form>

                                <button onClick={handleSubmit}>Submit</button> 
                                <button onClick={onClose}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h2>Product Details</h2>
                                <div className="full-products">
                                    <div className="product-details img">
                                        <img src={response.imageUrl} onError={(e) => e.target.src = place} />
                                    </div>
                                    <div className="product-details-info">
                                        <div className="product-details">
                                            <div>Name :</div>
                                            <div>{response?.product?.productId}</div>
                                        </div>
                                        <div className="product-details">
                                            <div>Name :</div>
                                            <div>{response?.product?.name}</div>
                                        </div>
                                        <div className="product-details">
                                            <div>Description :</div>
                                            <div>{response?.product?.description}</div>
                                        </div>
                                        <div className="product-details">
                                            <div>Price :</div>
                                            <div>{response?.product?.price}</div>
                                        </div>
                                        <div className="product-details">
                                            <div>Stock :</div>
                                            <div>{response?.product?.stock}</div>
                                        </div>
                                        <div className="product-details">
                                            <div>Category :</div>
                                            <div>{response?.product?.category?.categoryName}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-details">
                                    <button onClick={onClose}>Close</button>
                                </div>
                            </>
                        )
                    )
                }

                {/* Delete Product Form  */}
                {modalType === "deleteProduct" &&
                    (!response ? (
                        <>
                            <h2>Delete Product</h2>
                            <form>
                                <input type="number"
                                    placeholder='Enter Product ID'
                                    value={inputValue}
                                    onChange={handleGeneralInputChange}
                                />
                            </form>
                            <button onClick={handleSubmit}>Delete</button>
                            <button onClick={onClose}>Cancel</button>
                        </>
                    ) : (
                        <div>
                            <h2>Product Deleted Successfully</h2>
                            <button onClick={onClose}>Close</button>
                        </div>
                    ))
                }

                {/* View User Details Form  */}
                {modalType === "viewUser" && (
                    <>
                        <h2>View User Details</h2>
                        <form>
                            <input type="number"
                                placeholder='Enter User ID'
                                value={inputValue}
                                onChange={handleGeneralInputChange}
                            />
                        </form>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={onclose}>Cancel</button>
                    </>
                )}

                {/* Response Display  */}
                {/* {modalType === "response" && !response.ok && (
                    <>
                        (
                            <>
                                <h2>Error 1</h2>
                                <p>Something went wrong.</p>
                            </>
                        )
                        <button onClick={onClose}>Back to Dashboard</button>
                    </>
                )} */}


                {modalType === "monthlyBusiness" && (
                    <>
                        <form className="modal-form">
                            {!response && (
                                <>
                                    <div className="modal-form-item">
                                        <label htmlFor="month">Month:</label>
                                        <input type="number" id='month'
                                            name='month'
                                            placeholder='10'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="modal-form-item">
                                        <label htmlFor="year">Year:</label>
                                        <input type="number" id='year'
                                            name='year'
                                            placeholder='2025'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button onClick={handleSubmit}>Submit</button>
                                </>
                            )}
                            {response && (
                                <div>
                                    <div className="business-response-item">
                                        <div>Total Business: ₹</div>
                                        <div>
                                            {response?.monthlyBusiness?.totalRevenue?.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="business-response-item">
                                        <h5>Category Sales</h5>
                                    </div>
                                    {Object.keys(response?.monthlyBusiness?.categorySales)?.map(
                                        (key) => {
                                            return (
                                                <div key={key} className="business-response-item">
                                                    <div>{key}</div>
                                                    <div>
                                                        {response?.monthlyBusiness?.categorySales[key]}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                            <button onClick={onClose}>Cancel</button>
                        </form>
                    </>
                )}

                {modalType === "dailyBusiness" && (
                    <>
                        <form className="modal-form">
                            {!response && (
                                <>
                                    <div className="modal-form-item">
                                        <label htmlFor="date">Date:</label>
                                        <input type="text" id='data'
                                            name='data'
                                            placeholder='2025-12-31'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button onClick={handleSubmit}>Submit</button>
                                </>
                            )}
                            {response && (
                                <div>
                                    <div className="business-response-item">
                                        <div>Total Business: ₹</div>
                                        <div>
                                            {response?.dailyBusiness?.totalBusiness?.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="business-response-item">
                                        <h5>Category Sales</h5>
                                    </div>
                                    {Object.keys(response?.dailyBusiness?.categorySales)?.map(
                                        (key) => {
                                            return (
                                                <div className="business-response-item">
                                                    <div>{key}</div>
                                                    <div>
                                                        {response?.dailyBusiness?.categorySales[key]}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                            <button onClick={onClose}>Cancel</button>
                        </form>
                    </>
                )}

            </div>
        </div>
    )
}
