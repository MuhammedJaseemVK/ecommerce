import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

function Register() {
    const [input, setInput] = useState({
        name: '',
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
        catch (error) {
            dispatch(hideLoading());
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <div className='bg-black h-screen flex flex-col justify-center items-center text-white'>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="label-field">Your name</label>
                    <input type="text" value={input.name} id="name" name="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required minLength={3} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="label-field">Your email</label>
                    <input type="email" id="email" value={input.email} name="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@email.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="label-field">Your password</label>
                    <input type="password" id="password" value={input.password} name="password" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="password" required minLength={3} />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
            <Link to='/login' className='mt-3'>Already have an account? Signin</Link>
        </div>
    )
}

export default Register