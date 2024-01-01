import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

import axios from 'axios';

function PublicRoute({ children }) {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const getUser = async () => {
        try {
            const res = await axios.get('/api/v1/user/get-user-info',
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
            if (res.data.success) {
                console.log(res.data);
                    dispatch(setUser(res.data.user));
            }
            else {
                <Navigate to='/' />
                localStorage.clear();
            }
        }
        catch (error) {
            localStorage.clear();
            console.log(error);
        }
    }

    if (localStorage.getItem('token')) {
        if(!user){
            getUser();
        }
    }
    return children

}

export default PublicRoute