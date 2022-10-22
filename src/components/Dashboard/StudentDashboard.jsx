/* eslint-disable no-unused-vars */
import { Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import '../../app.css';
import useAuth from '../../Hooks/useAuth';
import Coursecard from '../course-card/Coursecard';
import StudentLayout from '../default-layout/StudentLayout';
import Greetings from '../Greetings/Greetings';
import NoCourseCard from '../no-course-card/NoCourseCard';
import Todo from '../todo/Todo';

function StudentDashboard() {
    const { userUuid } = useAuth();
    const [firstCourse, setFirstCourse] = useState(null);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/course/student-course',
            headers: {
                'Content-Type': 'application/json',
                id: userUuid,
            },
        };

        axios(config)
            .then((response) => {
                const { courses } = response.data;
                if (courses.length > 1) {
                    setFirstCourse(courses.shift());
                    setCourseList(courses);
                } else if (courses.length) {
                    setFirstCourse(courses.shift());
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userUuid]);
    return (
        <StudentLayout>
            <Row gutter={[0, 8]}>
                <Col span={12} style={{ marginBottom: '8px' }}>
                    <Greetings userName="User" />
                    {firstCourse ? (
                        <Coursecard data={firstCourse} />
                    ) : (
                        <NoCourseCard type="Student" />
                    )}
                </Col>
                <Col span={12}>
                    <Todo userId={userUuid} />
                </Col>
            </Row>
            {courseList.length && (
                <Row gutter={[0, 8]}>
                    {courseList.map((sc) => (
                        <Col span={12} key={Math.random()}>
                            <Coursecard data={sc} />
                        </Col>
                    ))}
                </Row>
            )}
        </StudentLayout>
    );
}

export default StudentDashboard;
