/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const getLocalStorageInfo = ()=>{
    const logged = localStorage.getItem('loggedIn');
    const userId = localStorage.getItem('user_uuid');
    const token = localStorage.getItem('accessToken');
    const roles = localStorage.getItem('roles');

    return {
        logged,userId,token,roles
    }
}

function RequireAuth({allowedRoles}) {
    // const oldData = getLocalStorageInfo();
    // const { setUserUuid, setUserRole, setLoggedIn ,setAccessToken} = useAuth();
    // console.log(oldData)
    // if(oldData.logged &&  oldData.userId){
    //     setUserUuid(oldData.userId);
    //     setUserRole(oldData.roles);
    //     setLoggedIn(true);
    //     setAccessToken(oldData.token);
    // }

    const { loggedIn,userRole } = useAuth();
    const location = useLocation();
    let  objRole = JSON.parse(userRole);
     objRole = Object.keys(objRole);
    // console.log(location);
    
    const isAllowed = objRole.find((role)=> allowedRoles?.includes(role) );

    if( isAllowed && loggedIn){
        
        return <Outlet />
    }
    if(loggedIn){
        console.log('roles' , allowedRoles ,'my roles ',objRole , 'verdict : ',isAllowed)
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
        return  <Navigate to="/login" state={{ from: location }} replace />;
    

}

export default RequireAuth;
