/* eslint-disable no-unused-vars */
import { Button, Col, Form, Input, message, Row, Space } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

import './createcourse.css';
// import Editor from '../Editor/Editor';

function CreateCourse() {
    const [courseInfo, setCourseInfo] = useState('');
    const [lesson, setLesson] = useState([1, 2, 3]);
    const [userId, setUserId] = useState('12');

    const handleChange = (v, av) => {
        setCourseInfo(av);
    };
    const onFinish = (values) => {
        console.log(values);
        console.log(lesson);
        console.log(courseInfo);
        const courseUid = Math.random().toString(16).slice(2);
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course',
            headers: {
                'Access-Control-Allow-Origin': '*',
                id: courseUid,
                name: values.course_name,
                code: values.course_code,
                desc: values.syllabus,
                othersinfo: values.marks_info,
                instructor: 'Teacher Name',
                creatorid: userId,
            },
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    message.success('new Course Created');
                }
            })
            .catch((error) => {
                console.log(error);
                message.error(`Failed to create new course.
                check course name & course Code.Make sure they are unique.`);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="create-Course-container">
            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                onValuesChange={handleChange}
            >
                <Row gutter={16}>
                    <Col span={4}>
                        <Form.Item
                            name="course_code"
                            label="Course Code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Course Code',
                                },
                            ]}
                        >
                            <Input placeholder="Course Code" />
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item
                            name="course_name"
                            label="course Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter course name',
                                },
                            ]}
                        >
                            <Input placeholder="Please enter Course name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="syllabus"
                            label="Syllabus & Recommended Books"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Course Syllabus',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="please enter description" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="marks_info"
                            label="Marks distribution & Others Info"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Course Syllabus',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="please enter description" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Space />
        </div>
    );
}

export default CreateCourse;
