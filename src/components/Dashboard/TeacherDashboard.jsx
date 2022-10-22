/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../app.css';
import useAuth from '../../Hooks/useAuth';
import Coursecard from '../course-card/Coursecard';
import DefaultLayout from '../default-layout/DefaultLayout';
import Greetings from '../Greetings/Greetings';
import NoCourseCard from '../no-course-card/NoCourseCard';
import Todo from '../todo/Todo';

function TeacherDashboard() {
    const { userUuid } = useAuth();
    const [firstCourse, setFirstCourse] = useState(null);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/course/teacher-course',
            headers: {
                id: userUuid,
            },
        };

        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                if (response.data.message === 'ok') {
                    // console.log('lees go');
                    const { courses } = response.data;
                    if (courses.length > 1) {
                        setFirstCourse(courses.shift());
                        setCourseList(courses);
                    } else if (courses.length) {
                        setFirstCourse(courses.shift());
                    }
                    // console.log('first', firstCourse);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userUuid]);
    return (
        <DefaultLayout>
            <Row gutter={[0, 8]}>
                <Col span={12} style={{ marginBottom: '8px' }}>
                    <Greetings userName="User" />
                    {firstCourse ? (
                        <Coursecard data={firstCourse} />
                    ) : (
                        <NoCourseCard type="Teacher" />
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
        </DefaultLayout>
    );
}

export default TeacherDashboard;
