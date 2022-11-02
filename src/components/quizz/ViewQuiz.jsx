/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import StudentViewQuiz from '../task-view/StudentViewQuiz';
import TeacherTaskViewTab from '../task-view/TeacherTaskViewTab';

function ViewQuiz() {
    const { userRole } = useAuth();
    const loc = useLocation().pathname.split('/').pop() || '';

    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return <TeacherTaskViewTab tid={loc} />;
    }
    return <StudentViewQuiz tid={loc} />;
}

export default ViewQuiz;
