/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

import React from 'react';
import useAuth from '../../Hooks/useAuth';
import StudentViewQuiz from './StudentViewQuiz';
import TeacherViewQuiz from './TeacherViewQuiz';

function ViewQuiz({ cid }) {
    const { userRole } = useAuth();

    // console.log(loc);

    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return <TeacherViewQuiz cid={cid} />;
    }
    return <StudentViewQuiz cid={cid} />;
}

export default ViewQuiz;
