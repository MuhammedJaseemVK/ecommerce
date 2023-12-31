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
                    <label htmlFor="email" className="label-field">Your email</label>
                    <input type="email" id="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} className="input-field" placeholder="name@email.com" required />
                    <button type="submit" className='btn'>
                        Send password-reset link
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword