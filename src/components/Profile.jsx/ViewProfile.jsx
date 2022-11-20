/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import ViewStudentProfile from './ViewStudentProfile';
import ViewTeacherProfile from './ViewTeacherProfile';

function ViewProfile() {
    const targetUserId = useLocation().pathname.split('/').pop();
    const [userData, setUserdata] = useState();
    const [role, setRole] = useState();
    useEffect(() => {
        if (targetUserId) {
            const config = {
                method: 'get',
                url: `http://localhost:3003/api/user/get/${targetUserId}`,
                headers: {},
            };
            axios(config)
                .then((response) => {
                    const pd = JSON.stringify(response.data);
                    const userRole = Object.keys(response.data.roles).includes('Student')
                        ? 'Student'
                        : 'Teacher';
                    setRole(userRole);
                    setUserdata(pd);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [targetUserId]);

    return userData ? (
        role === 'Student' ? (
            <ViewStudentProfile data={userData} />
        ) : (
            <ViewTeacherProfile data={userData} />
        )
    ) : (
        <div />
    );
}

export default ViewProfile;
