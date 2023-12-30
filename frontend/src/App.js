import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import { useSelector } from "react-redux"
import Spinner from "./components/Spinner";
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <div className='h-screen'>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <ToastContainer />
            <Routes>
              <Route path='/' element={<Home /> }/>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/user/:id/verify/:token' element={<VerifyEmail />} />
              <Route path='/user/reset-password/:id/:token' element={<ResetPassword />} />
              <Route path='/user/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App