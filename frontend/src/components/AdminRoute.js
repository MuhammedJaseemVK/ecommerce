import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';
import { toast } from 'react-toastify';

function AdminRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate=useNavigate();
    const getUser = async () => {
        try {
            // dispatch(showLoading());
            const res = await axios.get('/api/v1/user/get-user-info',
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
            // dispatch(hideLoading());
            if (res.data.success && res.data.user.role === "admin") {
                dispatch(setUser(res.data.user));
            }
            else {
                navigate('/')
            }
        }
        catch (error) {
            // dispatch(hideLoading());
            localStorage.clear();
            console.log(error);
        }
    }

    // useEffect(() => {
        // if (!user) {
        //     getUser();
        // }
    // }, []);

    if (localStorage.getItem('token')) {
        if (!user) {
            getUser();
        }
        return children
    }
    else {
        return <Navigate to='/' />
    }
}

export default AdminRoute