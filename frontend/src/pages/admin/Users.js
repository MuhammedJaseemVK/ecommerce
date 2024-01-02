import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';

function Users() {
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/get-all-users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setUsers(res.data.data);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // const handleAccountStatus = async (user, status) => {
    //     try {
    //         const res = await axios.post('/api/v1/admin/change-account-status', { sellerId: user._id, status }, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //         if (res.data.success) {
    //             toast(res.data.message);
    //             getAllSellers();
    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //         toast(error.response.data.message);
    //     }
    // }

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <Layout>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Sellers</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                verified
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.isVerified ? "Verified" : "Not verified"}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Users