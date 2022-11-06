/* eslint-disable no-unused-vars */
import { Result, Tabs } from 'antd';
import React, { useState } from 'react';

import CoursePeopleTab from '../course-view-tabs/CoursePeopleTab';
import CourseTeacherTask from '../course-view-tabs/CourseTeacherTask';
import CourseViewTab from '../course-view-tabs/CourseViewTab';
import TeacherAnnouncement from '../course-view-tabs/TeacherAnnouncement';
import DefaultLayout from '../default-layout/DefaultLayout';

function ViewTeacherCourse({ cid }) {
    const [okCourse, setOkCourse] = useState(true);
    const setOk = (val) => {
        setOkCourse(val);
    };
    const tabItems = [
        {
            label: 'Announement',
            key: '1',
            children: <TeacherAnnouncement hidden={setOk} cid={cid} />,
        },
        {
            label: 'Classroom',
            key: '2',
            children: <CourseViewTab hidden={setOk} cid={cid} />,
        },
        {
            label: 'Tasks',
            key: '3',
            children: <CourseTeacherTask cid={cid} />,
            disabled: false,
        },
        {
            label: 'People',
            key: '4',
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
