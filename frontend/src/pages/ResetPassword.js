import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { FaLinkSlash } from 'react-icons/fa6';

function ResetPassword() {
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState('');
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const verifyUrl = async () => {
        try {
            const res = await axios.get(`/api/v1/user/reset-password/${params.id}/${params.token}`);
            if (res.data.success) {
                setValidUrl(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            dispatch(showLoading());
            const res = await axios.post(`/api/v1/user/reset-password/${params.id}/${params.token}`, { password });
            dispatch(hideLoading());
            if (res.data.success) {
                toast.success(res.data.message);
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
    useEffect(() => {
        verifyUrl();
    }, []);
    return (
        <>
            {validUrl ?
                (<div>
                    <div className="container">
                        <form onSubmit={handleSubmit} className='form-container'>
                            <h1>Enter new password</h1>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" id="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@email.com" required />
                            <button type="submit" className='btn'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>) :
                (<div className='container'>
                    <FaLinkSlash color='red' size={50} />
                    <p className='text-xl'>Invalid link</p>
                </div>)}
        </>
    )
}

export default ResetPassword