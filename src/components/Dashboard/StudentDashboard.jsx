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
    const [noCard, setNoCard] = useState(true);
    const [courseList, setCourseList] = useState(null);

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/user/all-courses',
            headers: {
                'Content-Type': 'application/json',
                id: userUuid,
            },
        };

        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                if (response.data.length) {
                    setCourseList(response.data);
                    setNoCard(false);
                } else {
                    setNoCard(true);
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
                    <Greetings />
                    {noCard ? <NoCourseCard type="Student" /> : <Coursecard days={[1, 2, 3]} />}
                </Col>
                <Col span={12}>
                    <Todo userId={userUuid} />
                </Col>
            </Row>
            <Row gutter={[0, 8]}>
                {/* <Col span={12}>
                    <Coursecard days={[1, 2, 3]} />
                </Col>
                <Col span={12}>
                    <Coursecard days={[1, 2, 3]} />
                </Col>
                <Col span={12}>
                    <Coursecard days={[1, 2, 3]} />
                </Col>
                <Col span={12}>
                    <Coursecard days={[1, 2, 3]} />
                </Col> */}
            </Row>
        </StudentLayout>
    );
}

export default StudentDashboard;
