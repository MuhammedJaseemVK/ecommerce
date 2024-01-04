import React from 'react'
import Navbar from './Navbar';

function Layout({ children }) {

    return (
        <div className='h-cover w-full bg-gray-900 absolute'>
            <Navbar />
            <div className='max-w-screen-xl mx-auto mt-20'>{children}</div>
        </div>
    )
}

export default Layout