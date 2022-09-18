import { Tabs } from 'antd';
import React from 'react';
// import AddLesson from '../create-course/AddLesson';
import CreateCourse from '../create-course/CreateCourse';
import EditCourse from '../create-course/EditCourse';
import NewLesson from '../create-course/NewLesson';

function ManageCourses() {
    const tabItems = [
        {
            label: 'Add Lesson',
            key: '1',
            children: <NewLesson />,
        },
        {
            label: 'Add Task',
            key: '2',
            children: 'Add Task content',
            disabled: false,
        },
        {
            label: 'Edit Course',
            key: '3',
            children: <EditCourse />,
        },
        {
            label: 'Create Course',
            key: '4',
            children: <CreateCourse />,
        },
    ];
    return <Tabs defaultActiveKey="1" tabBarGutter="24" centered items={tabItems} />;
}

export default ManageCourses;
