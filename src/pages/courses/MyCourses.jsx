import React from 'react';
import ManageCourses from '../../components/course-management/ManageCourses';
import DefaultLayout from '../../components/default-layout/DefaultLayout';

function MyCourses() {
    return (
        <DefaultLayout>
            <ManageCourses />
        </DefaultLayout>
    );
}

export default MyCourses;
