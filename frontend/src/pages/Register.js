import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

function Register() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    });
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', input);
            dispatch(hideLoading());
            if (res.data.success) {
                toast.success("User is created");
                navigate('/login');
            }
            else {
                toast.error(res.data.message);
                console.log(res.data.message);
            }
        }
        catch(error){
            dispatch(hideLoading());
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <div className='bg-black h-screen flex flex-col justify-center items-center text-white'>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="name" value={input.name} id="name" name="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required minLength={3} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" value={input.email} name="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@email.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" value={input.password} name="password" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="password" required minLength={3} />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            </form>
                <Link to='/login' className='mt-3'>Already have an account? Signin</Link>
        </div>
    )
}

export default Register