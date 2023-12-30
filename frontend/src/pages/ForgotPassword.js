import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [email,setEmail] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/reset-password', { email });
            dispatch(hideLoading());
            if (res.data.success) {
                toast.success(res.data.message);
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
        <div>
            <div className="container">
                <form onSubmit={handleSubmit} className='form-container'>
                    <h1>Enter your email</h1>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@email.com" required />
                    <button type="submit" className='btn'>
                        Send password-reset link
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword