import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const getAllNotifications = async () => {
        try {
            const res = await axios.get('/api/v1/user/get-all-notifications', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setNotifications(res.data.data);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllNotifications();
    }, []);
    return (
        <Layout>
            <div className='flex items-center justify-center mt-10'>
            <div className='flex flex-col  w-[60%]'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Notifications</h1>

                {
                    notifications && notifications.map((notification) => (
                        <Link to={notification?.data?.onClickPath} className='bg-blue-500 flex p-2 gap-2 rounded-md my-2'>
                            <p>{notification.message}</p>
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{notification.type}</span>
                        </Link>
                    ))
                }
                </div>
            </div>
        </Layout>
    )
}

export default Notifications