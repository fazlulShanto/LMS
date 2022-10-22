/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

import ViewStudentCourse from '../ViewCourse/ViewStudentCourse';
import ViewTeacherCourse from '../ViewCourse/ViewTeacherCourse';

function Course() {
    const [val, setVal] = useState({});
    const { userRole } = useAuth();
    const loc = useLocation().pathname.split('/').pop();
    // console.log(loc);

    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return <ViewTeacherCourse cid={loc} />;
    }
    return <ViewStudentCourse cid={loc} />;
}

export default Course;
