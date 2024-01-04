import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import axios from 'axios';
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const res = await axios.get('/api/v1/user/get-all-products');
      if (res.data.success) {
        setProducts(res.data.products);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <Layout >
      <div className="flex flex-wrap gap-2">
        {
          products.map((product) =>
          (<Link to={`/products/${product._id}`} key={product._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="p-8 rounded-t-lg aspect-video" src={product.imageUrl} alt="product image" />
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
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
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                <Link to='/' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</Link>
              </div>
            </div>
          </Link>))
        }
      </div>
    </Layout>
  );
};

export default Home;