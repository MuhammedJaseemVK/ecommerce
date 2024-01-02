import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

function AddProduct() {
    const [input, setInput] = useState({
        name: '',
        category: '',
        subCategory: '',
        imageUrl:'',
        price:''
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
            const res = await axios.post('/api/v1/seller/add-product', input,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
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
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="label-field">Product name</label>
                    <input type="name" value={input.name} id="name" name="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required minLength={3} />
                </div>
                <div className="mb-5">
                    <label htmlFor="category" className="label-field">Product category</label>
                    <input type="text" value={input.category} id="category" name="category" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required minLength={3} />
                </div>
                <div className="mb-5">
                    <label htmlFor="subCategory" className="label-field">Product sub category</label>
                    <input type="text" value={input.subCategory} id="subCategory" name="subCategory" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required minLength={3} />
                </div>
                <div className="mb-5">
                    <label htmlFor="price" className="label-field">Product price</label>
                    <input type="text" value={input.price} id="price" name="price" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required minLength={3} />
                </div>
                <div className="mb-5">
                    <label htmlFor="imageUrl" className="label-field">productImage</label>
                    <input type="text" value={input.imageUrl} id="imageUrl" name="imageUrl" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name" required minLength={3} />
                </div>
                <button type="submit" className="btn">Add product</button>
                <button onClick={()=>navigate('/seller/my-products')} className="btn">Go back</button>
            </form>
        </div>
    )
}

export default AddProduct