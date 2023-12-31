import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';
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
            const res = await axios.post('/api/v1/user/apply-for-seller', input,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
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
            <form className="form-container" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName" className="label-field">First name</label>
                    <input type="firstName" value={input.firstName} id="firstName" name="firstName" onChange={handleChange} className="input-field" placeholder="firstName" required minLength={3} />
                </div>
                <div>
                    <label htmlFor="lastName" className="label-field">Last name</label>
                    <input type="lastName" value={input.lastName} id="lastName" name="lastName" onChange={handleChange} className="input-field" placeholder="lastName" required minLength={3} />
                </div>
                <div>
                    <label htmlFor="email" className="label-field">Email</label>
                    <input type="email" id="email" value={input.email} name="email" onChange={handleChange} className="input-field" placeholder="name@email.com" required />
                </div>
                <div>
                    <label htmlFor="phone" className="label-field">Phone</label>
                    <input type="text" value={input.phone} id="phone" name="phone" onChange={handleChange} className="input-field" placeholder="phone" required minLength={3} />
                </div>
                <div>
                    <label htmlFor="website" className="label-field">Website</label>
                    <input type="text" value={input.website} id="website" name="website" onChange={handleChange} className="input-field" placeholder="website" required minLength={3} />
                </div>
                <div>
                    <label htmlFor="address" className="label-field">Address</label>
                    <input type="text" value={input.address} id="address" name="address" onChange={handleChange} className="input-field" placeholder="address" required minLength={3} />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    )
}

export default ApplyForSeller