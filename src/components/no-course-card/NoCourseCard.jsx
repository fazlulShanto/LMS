/* eslint-disable no-unused-vars */
import React from 'react';

import useAuth from '../../Hooks/useAuth';

function NoCourseCard({ type }) {
    const { userUuid } = useAuth();
    const msg = type === 'Student' ? `You haven't enrolled in any coureses` : 'Create a New Course';
    return (
        <div className="course-card-container">
            <h1>{msg}</h1>
        </div>
    );
}

export default NoCourseCard;
