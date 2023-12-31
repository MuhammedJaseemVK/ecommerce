import React from 'react'
import Navbar from './Navbar';

function Layout({ children }) {

    return (
        <div className='h-screen w-full bg-yellow-500 relative '>
            <Navbar />
            <div className='max-w-screen-xl mx-auto mt-5'>{children}</div>
        </div>
    )
}

export default Layout