import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

function AdminRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const getUser = async () => {
        try {
            dispatch(showLoading());
            console.log("fetching");
            const res = await axios.get('/api/v1/user/get-user-info',
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
            dispatch(hideLoading());
            console.log("fetching done");
            if (res.data.success && res.data.user.role === "admin") {
                dispatch(setUser(res.data.user));
            }
            else {
                <Navigate to='/login' />
                localStorage.clear();
            }
        }
        catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []);

    if (localStorage.getItem('token')) {
        return children
    }
    else {
        return <Navigate to='/login' />
    }
}

export default AdminRoute