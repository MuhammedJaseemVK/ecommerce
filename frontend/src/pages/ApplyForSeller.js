import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

function ApplyForSeller() {
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        website: '',
        address: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-for-seller', input, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                toast.success("Seller request sent to admin");
                navigate('/');
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
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Apply for seller</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input type="text" value={input.firstName} onChange={handleChange} name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="first name" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input type="text" value={input.lastName} onChange={handleChange} name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="last name" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" value={input.email} onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@email.com" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input type="number" value={input.phone} onChange={handleChange} name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12345678" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                                <input type="text" value={input.website} onChange={handleChange} name="website" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="website.com" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" value={input.address} onChange={handleChange} name="address" id="emaddressail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="New York" required />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Apply
                            </button>
                            <button onClick={() => navigate('/')} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-primary-700 bg-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-200">Go back</button>
                        </div>
                    </form>
                </div>
            </section >
        </div>
    )
}

export default ApplyForSeller