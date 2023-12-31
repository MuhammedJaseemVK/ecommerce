import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';

function Sellers() {
    const [sellers, setSellers] = useState([]);

    const getAllSellers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/get-all-sellers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setSellers(res.data.data);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleAccountStatus = async (seller, status) => {
        try {
            const res = await axios.post('/api/v1/admin/change-account-status', { sellerId: seller._id, status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                toast(res.data.message);
                getAllSellers();
            }
        }
        catch (error) {
            console.log(error);
            toast(error.response.data.message);
        }
    }

    useEffect(() => {
        getAllSellers();
    }, []);

    return (
        <Layout>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Sellers</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Seller name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers && sellers.map((seller) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {`${seller.firstName} ${seller.lastName}`}
                                    </th>
                                    <td className="px-6 py-4">
                                        {seller.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {seller.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {seller.status}
                                    </td>
                                    {
                                        seller.status === 'approved' ?
                                            (<td className="px-6 py-4">
                                                <button onClick={() => handleAccountStatus(seller, 'rejected')} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>
                                            </td>) :
                                            (<td className="px-6 py-4">
                                                <button onClick={() => handleAccountStatus(seller, 'approved')} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Accept</button>
                                            </td>)

                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </Layout>
    )
}

export default Sellers