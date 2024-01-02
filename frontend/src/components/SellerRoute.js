import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';

function SellerRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate=useNavigate();
    const getUser = async () => {
        try {
            const res = await axios.get('/api/v1/user/get-user-info',
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
            if (res.data.success && res.data.user.role === "seller") {
                dispatch(setUser(res.data.user));
            }
            else {
                navigate('/')
            }
        }
        catch (error) {
            localStorage.clear();
            console.log(error);
        }
    }

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

export default SellerRoute