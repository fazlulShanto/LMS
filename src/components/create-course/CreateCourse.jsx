/* eslint-disable no-unused-vars */
import { Button, Col, Form, Input, Row, Space } from 'antd';
import React, { useState } from 'react';
import Lesson from '../lesson/Lesson';
import AddLesson from './AddLesson';

import './createcourse.css';
// import Editor from '../Editor/Editor';

function CreateCourse() {
    const [courseInfo, setCourseInfo] = useState('');
    const [lesson, setLesson] = useState([1, 2, 3]);
    const handleChange = (v, av) => {
        setCourseInfo(av);
    };
    const onFinish = (values) => {
        console.log(values);
        console.log(courseInfo);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="create-Course-container">
            <h1>Create Course</h1>
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

                <Row gutter={16} className="mr-bot-8">
                    <Col span={24}>
                        <Lesson />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={10}>
                        <AddLesson />
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
