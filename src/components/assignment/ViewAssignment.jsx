import React from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import ViewAssignmentStudent from './ViewAssignmentStudent';
import ViewAssignmentTeacher from './ViewAssignmentTeacher';

function ViewAssignment() {
    const { userRole } = useAuth();
    const loc = useLocation().pathname.split('/').pop() || '';

    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return <ViewAssignmentTeacher tid={loc} />;
    }
    return <ViewAssignmentStudent tid={loc} />;
}

export default ViewAssignment;
