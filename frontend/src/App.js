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
import ApplyForSeller from './pages/ApplyForSeller';
import Notifications from './pages/Notifications';
import Sellers from './pages/admin/Sellers';
import Users from './pages/admin/Users';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <div className='h-screen'>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <ToastContainer />
            <Routes>
              <Route path='/' element={<PublicRoute><Home /></PublicRoute>} />
              <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
              <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
              <Route path='/user/:id/verify/:token' element={<VerifyEmail />} />
              <Route path='/user/reset-password/:id/:token' element={<ResetPassword />} />
              <Route path='/user/forgot-password' element={<ForgotPassword />} />
              <Route path='/user/apply-for-seller' element={<ApplyForSeller />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/admin/sellers' element={<Sellers />} />
              <Route path='/admin/users' element={<Users />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App