import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [seenNotifications, setSeenNotifications] = useState([]);
    const [loadded, setLoadded] = useState(false);
    const getAllNotifications = async () => {
        try {
            const res = await axios.get('/api/v1/user/get-all-notifications', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setNotifications(res.data.data.notification);
                setLoadded(true);
                setSeenNotifications(res.data.data.seenNotification);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleMarkAllRead = async () => {
        try {
            const res = await axios.get('/api/v1/user/mark-all-read', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                getAllNotifications();
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const handleDeleteAllNotification = async () => {
        try {
            const res = await axios.get('/api/v1/user/delete-all-notifications', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                getAllNotifications();
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
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
                    <div>
                        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                            <ul className="flex justify-between -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                                <div className='flex'>
                                    <li className="me-2" role="presentation">
                                        <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Unread</button>
                                    </li>
                                    <li className="me-2" role="presentation">
                                        <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Read</button>
                                    </li>
                                </div>
                                <div className='flex justify-end '>
                                    <button onClick={handleDeleteAllNotification} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete All</button>
                                    <button onClick={handleMarkAllRead} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Mark all as read</button>
                                </div>
                            </ul>
                        </div>
                        <div id="default-tab-content">
                            <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                {
                                    notifications && notifications.map((notification) => (
                                        <Link to={notification?.data?.onClickPath} className='bg-blue-500 flex p-2 gap-2 rounded-md my-2'>
                                            <p>{notification.message}</p>
                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{notification.type}</span>
                                        </Link>
                                    ))
                                }
                            </div>
                            <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                {
                                    seenNotifications && seenNotifications.map((notification) => (
                                        <Link to={notification?.data?.onClickPath} className='bg-blue-500 flex p-2 gap-2 rounded-md my-2'>
                                            <p>{notification.message}</p>
                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{notification.type}</span>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Notifications