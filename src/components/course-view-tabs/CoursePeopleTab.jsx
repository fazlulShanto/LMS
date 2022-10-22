import React from 'react';
import useAuth from '../../Hooks/useAuth';
import './coursepeopletab.css';
import StudentPeopleTab from './StudentPeopleTab';
import TeacherPeopleTab from './TeacherPeopleTab';

function CoursePeopleTab({ cid }) {
    const { userRole } = useAuth();

    // console.log(loc);

    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return <TeacherPeopleTab cid={cid} />;
    }
    return <StudentPeopleTab cid={cid} />;
}

export default CoursePeopleTab;
