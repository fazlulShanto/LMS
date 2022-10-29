/* eslint-disable no-unused-vars */
import { Result, Tabs } from 'antd';
import React, { useState } from 'react';

import CoursePeopleTab from '../course-view-tabs/CoursePeopleTab';
import CourseStudentTask from '../course-view-tabs/CourseStudentTask';
import CourseViewTab from '../course-view-tabs/CourseViewTab';
import StudentLayout from '../default-layout/StudentLayout';

function ViewStudentCourse({ cid }) {
    const [okCourse, setOkCourse] = useState(true);
    const setOk = (val) => {
        setOkCourse(val);
    };
    const tabItems = [
        {
            label: 'Classroom',
            key: '1',
            children: <CourseViewTab hidden={setOk} cid={cid} />,
        },
        {
            label: 'Tasks',
            key: '2',
            children: <CourseStudentTask cid={cid} />,
            disabled: false,
        },
        {
            label: 'People',
            key: '3',
            children: <CoursePeopleTab cid={cid} />,
        },
    ];

    return (
        <StudentLayout>
            {okCourse ? (
                <Tabs defaultActiveKey="1" tabBarGutter="24" centered items={tabItems} />
            ) : (
                <Result status="error" title="No Such course Exist" />
            )}
        </StudentLayout>
    );
}

export default ViewStudentCourse;
