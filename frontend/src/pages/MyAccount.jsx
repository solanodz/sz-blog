import { UserContext } from '@/components/UserContext';
import { useContext, useEffect, useState } from 'react';

function MyAccount({ userId }) {

    const { setUserInfo, userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);


    return (
        <div>
            <h1>{userInfo.username}</h1>
            <p>Email: {userInfo.email}</p>
            {/* Display other user information here */}
        </div>
    );
}

export default MyAccount;