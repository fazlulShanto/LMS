/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from 'react-router-dom';

const getLocalStorageInfo = () => {
    const logged = localStorage.getItem('loggedIn');
    const userId = localStorage.getItem('user_uuid');
    const token = localStorage.getItem('accessToken');
    const roles = localStorage.getItem('roles');

    return {
        logged,
        userId,
        token,
        roles,
    };
};

function WithoutAuth() {
    const oldData = getLocalStorageInfo();
    if (oldData.logged && oldData.userId) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
}

export default WithoutAuth;
