import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';

function MyProducts() {
    const [sellerProducts, setSellerProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        subCategory: '',
        imageUrl: '',
        price: ''
    })
    const ModalOpenRef = useRef();
    const modalCloseRef = useRef();
    const getAllProducts = async () => {
        try {
            const res = await axios.get('/api/v1/seller/get-all-products', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setSellerProducts(res.data.products);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProduct = async (productId) => {
        try {
            const res = await axios.post('/api/v1/seller/delete-product', { productId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message);
                setProductData({
                    name: '',
                    category: '',
                    subCategory: '',
                    imageUrl: '',
                    price: ''
                });
                getAllProducts();
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const handleEditor = (productId) => {
        const product = sellerProducts.filter((product) => product?._id === productId);
        setProductData({
            name: product[0]?.name, category: product[0]?.category, subCategory: product[0]?.subCategory, imageUrl: product[0]?.imageUrl, price: product[0]?.price
        });
        setProductId(productId);
        ModalOpenRef.current.click();
    }

    const handleEditProduct = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post('/api/v1/seller/edit-product', { productId, productData }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message);
                setProductData({
                    name: '',
                    category: '',
                    subCategory: '',
                    imageUrl: '',
                    price: ''
                })
                getAllProducts();
                modalCloseRef.current.click();
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">My products</h1>
            <div className="relative overflow-x-auto">
                {
                    sellerProducts.length === 0 ? (<div className='container'>No products</div>) :
                        (<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellerProducts && sellerProducts.map((product) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.subCategory}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDeleteProduct(product._id)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                            <button onClick={() => handleEditor(product._id)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">Edit</button>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>)
                }
            </div>
            <div>
                {/* Modal toggle */}
                <button ref={ModalOpenRef} data-modal-target="default-modal" data-modal-toggle="default-modal" className=" hidden block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Toggle modal
                </button>
                {/* Main modal */}
                <div id="default-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <form className="form-container" onSubmit={handleEditProduct}>
                            <div className="mb-5">
                                <label htmlFor="name" className="label-field">Product name</label>
                                <input type="name" value={productData.name} id="name" name="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required minLength={3} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="category" className="label-field">Product category</label>
                                <input type="text" value={productData.category} id="category" name="category" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="category" required minLength={3} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="subCategory" className="label-field">Product sub category</label>
                                <input type="text" value={productData.subCategory} id="subCategory" name="subCategory" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="sub category" required minLength={3} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="price" className="label-field">Product price</label>
                                <input type="text" value={productData.price} id="price" name="price" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="price" required minLength={3} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="imageUrl" className="label-field">productImage</label>
                                <input type="text" value={productData.imageUrl} id="imageUrl" name="imageUrl" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="product image url" required minLength={3} />
                            </div>
                            <button ref={modalCloseRef} data-modal-hide="default-modal" type="button" className="btn">Close</button>
                            <button type="submit" className="btn">Make Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default MyProducts