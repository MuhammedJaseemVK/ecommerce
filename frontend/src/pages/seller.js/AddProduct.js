import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

function AddProduct() {
    const [input, setInput] = useState({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        imageUrl: '',
        count: '',
        price: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e.target);
        if (e.target.name === "category") {
            setInput({ ...input, category: e.target.value });
            console.log(input)
        }
        else {
            setInput({ ...input, [e.target.name]: e.target.value });
        }
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            dispatch(showLoading());
            const res = await axios.post('/api/v1/seller/add-product', input, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                toast.success("new product is created");
            }
            else {
                toast.error(res.data.message);
                console.log(res.data.message);
            }
        }
        catch (error) {
            dispatch(hideLoading());
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <div className='container'>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <input type="text" value={input.name} onChange={handleChange} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="product name" required />
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select name="category" value={input.category} id="category" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option disabled>Select category</option>
                                    <option value="Appliances">Appliances</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Vehicles">Vehicles</option>
                                    <option value="Phones">Phones</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" value={input.price} onChange={handleChange} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                            </div>
                            <div>
                                <label htmlFor="count" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">count</label>
                                <input type="number" value={input.count} onChange={handleChange} name="count" id="count" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={12} required />
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image Url</label>
                                <input type="text" value={input.imageUrl} onChange={handleChange} name="imageUrl" id="imageUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="imageUrl.com" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" value={input.description} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea name="description" id="description" rows={8} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" defaultValue={""} />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Add product
                            </button>
                            <button onClick={() => navigate('/seller/my-products')} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-primary-700 bg-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-200">Go back</button>
                        </div>
                    </form>
                </div>
            </section >
        </div >
    )
}

export default AddProduct