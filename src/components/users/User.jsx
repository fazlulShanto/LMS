import React from 'react';
import { useLocation } from 'react-router-dom';

function User() {
    const { pathname } = useLocation();
    const userId = pathname.split('/')[2];

    return <div>User {userId}</div>;
}

export default User;
