import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';

function Products() {
    const [products, setProducts] = useState([]);

    const getAllSellers = async () => {
        try {
            const res = await axios.get('/api/v1/user/get-all-products')
            if (res.data.success) {
                setProducts(res.data.products);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllSellers();
    }, []);

    return (
        <Layout>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Products</h1>
            <div className="relative overflow-x-auto">
                {
                    products.length === 0 ? (<div className='container'>No Products</div>) :
                        (<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        count
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products && products.map((product) => (
                                        <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {product.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.description}
                                            </td>
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
                                                {product.count}
                                            </td>
                                            <td className="px-6 py-4 flex">
                                                {
                                                    Array.from({ length: product.rating }).map((star,index) => (
                                                        <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                        </svg>))
                                                }
                                                {
                                                    Array.from({ length: 5 - product.rating }).map((blackStar,index) => (
                                                        <svg key={index} className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                        </svg>))
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>)
                }
            </div>
        </Layout>
    )
}

export default Products