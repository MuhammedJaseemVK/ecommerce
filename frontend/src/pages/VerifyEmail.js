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
                <div className='container text-white'>
                    <FaLink color='green' size={50}/>
                    <p className='text-xl'>Email verified successfully</p>
                </div>
            ) : (
                <div className='container text-white'>
                    <FaLinkSlash color='red' size={50}/>
                    <p className='text-xl'>Invalid link</p>
                </div>
            )}
        </>
    )
}

export default VerifyEmail