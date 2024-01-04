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
    const [confirmPassword, setConfirmPassword] = useState('');
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
            if(password!==confirmPassword){
                return toast.error('Passwords do not match');
            }
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
                    <div className="container text-white">
                        <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Reset password</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="password" required />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="password" required />
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                            Reset
                                        </button>
                                        <button onClick={() => navigate('/')} className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-primary-700 bg-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-200">Go back</button>
                                    </div>
                                </form>
                            </div>
                        </section >
                    </div>
                </div>) :
                (<div className='container text-white'>
                    <FaLinkSlash color='red' size={50} />
                    <p className='text-xl'>Invalid link</p>
                </div>)}
        </>
    )
}

export default ResetPassword