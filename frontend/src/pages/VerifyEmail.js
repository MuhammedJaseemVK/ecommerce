import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams();

    const verifyEmailUrl = async () => {
        try {
            const res = await axios.get(`/api/v1/user/${params.id}/verify/${params.token}`);
            if (res.data.success) {
                setValidUrl(true);
                console.log(res.data.message);
            }
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
                <div>
                    <img src="https://assets.isu.pub/document-structure/221206063302-b62f83e97af058af759e49d46029d563/v1/f35c0d3a6a30d1d863d1a00d709fdf18.jpeg" alt="green check" />
                    <h1>Email verified successfully</h1>
                </div>
            ) : (
                <div>404 not found</div>
            )}
        </>
    )
}

export default VerifyEmail