import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tabs } from 'flowbite-react';

function Notifications() {
    const [notifications, setNotifications] = useState(null);
    const [seenNotifications, setSeenNotifications] = useState(null);

    const getAllNotifications = async () => {
        try {
            const res = await axios.get('/api/v1/user/get-all-notifications', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setNotifications(res.data.data.notification);
                setSeenNotifications(res.data.data.seenNotification);
            }
        }
        catch (error) {
            console.log(error);
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
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">Notifications</h1>
            <div className='flex justify-end '>
                <button onClick={handleDeleteAllNotification} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete All</button>
                <button onClick={handleMarkAllRead} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Mark all as read</button>
            </div>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Unread" >
                    {
                        notifications && notifications.map((notification, index) => (
                            <Link to={notification?.data?.onClickPath} key={index} className='bg-blue-500 flex p-2 gap-2 rounded-md my-2'>
                                <p>{notification?.message}</p>
                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{notification.type}</span>
                            </Link>
                        ))
                    }
                </Tabs.Item>
                <Tabs.Item title="Read" >
                    {
                        seenNotifications && seenNotifications.map((notification, index) => (
                            <Link to={notification?.data?.onClickPath} key={index} className='bg-blue-500 flex p-2 gap-2 rounded-md my-2'>
                                <p>{notification?.message}</p>
                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{notification.type}</span>
                            </Link>
                        ))
                    }
                </Tabs.Item>
            </Tabs>
        </Layout>
    )
}

export default Notifications