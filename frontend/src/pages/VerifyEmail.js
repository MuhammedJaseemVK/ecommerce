import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaLinkSlash } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";

function VerifyEmail() {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();
    const navigate = useNavigate()

    const verifyEmailUrl = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/user/${params.id}/verify/${params.token}`);
            console.log(data);
            setValidUrl(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verifyEmailUrl();
    }, [])
    return (
        <>
            {validUrl ? (
                <div className='flex flex-col justify-center items-center h-full'>
                    <FaLinkSlash size={50} />
                    <h1>Email verified successfully</h1>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center h-full'>
                    <FaLink size={50} />
                    <h1>404 not found</h1>
                </div>
            )}
        </>
    )
}

export default VerifyEmail