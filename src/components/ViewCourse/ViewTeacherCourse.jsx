/* eslint-disable no-unused-vars */
import { Result, Tabs } from 'antd';
import React, { useState } from 'react';

import CoursePeopleTab from '../course-view-tabs/CoursePeopleTab';
import CourseTeacherTask from '../course-view-tabs/CourseTeacherTask';
import CourseViewTab from '../course-view-tabs/CourseViewTab';
import DefaultLayout from '../default-layout/DefaultLayout';

function ViewTeacherCourse({ cid }) {
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
            children: <CourseTeacherTask cid={cid} />,
            disabled: false,
        },
        {
            label: 'People',
            key: '3',
            children: <CoursePeopleTab cid={cid} />,
        },
    ];

    return (
        <DefaultLayout>
            {okCourse ? (
                <Tabs defaultActiveKey="1" tabBarGutter="24" centered items={tabItems} />
            ) : (
                <Result status="error" title="No Such course Exist" />
            )}
        </DefaultLayout>
    );
}

export default ViewTeacherCourse;
