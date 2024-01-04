import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from '../redux/features/userSlice';

function Login() {
    const [input, setInput] = useState({
        email: '',
        password: ''
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
            const res = await axios.post('/api/v1/user/login', input);
            dispatch(hideLoading());
            if (res.data.success) {
                toast.success("User logged in");
                dispatch(setUser(res.data.data));
                localStorage.setItem('token', res.data.token);
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
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" value={input.email} onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@email.com" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" value={input.password} onChange={handleChange} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="password" required />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Login
                            </button>
                            <button onClick={() => navigate('/')} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-primary-700 bg-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-200">Go back</button>
                        </div>
                        <div className='flex flex-col mt-3 items-center'>
                            <Link to='/user/forgot-password' className='mt-3 text-white'>Forgot password ?</Link>
                            <Link to='/register' className='mt-3 text-white'>Don't have an account? Signup</Link>
                        </div>
                    </form>
                </div>
            </section >
        </div>
    )
}

export default Login