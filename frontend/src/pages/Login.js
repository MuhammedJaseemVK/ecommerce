import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

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
            <form className="form-container" onSubmit={handleSubmit}>
            <h1 className='text-4xl font-bold mb-4 text-white'>User login</h1>
                <div className="mb-5">
                    <label htmlFor="email" className="label-field">Your email</label>
                    <input type="email" id="email" value={input.email} name="email" onChange={handleChange} className="input-field" placeholder="name@email.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="label-field">Your password</label>
                    <input type="password" id="password" value={input.password} name="password" onChange={handleChange} className="input-field" placeholder="password" required minLength={3} />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Login</button>
            <Link to='/user/forgot-password' className='mt-3'>Forgot password ?</Link>
            <Link to='/register' className='mt-3'>Don't have an account? Signup</Link>
            </form>
        </div>
    )
}

export default Login