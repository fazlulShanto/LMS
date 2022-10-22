/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { Button, Col, Form, Input, message, Row, Select, Space } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';

import './createcourse.css';

const { Option } = Select;
// import Editor from '../Editor/Editor';
const weekDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
function CreateCourse() {
    const { userName, userUuid } = useAuth();
    const [courseInfo, setCourseInfo] = useState('');
    const [userId, setUserId] = useState('12');

    const handleChange = (v, av) => {
        setCourseInfo(av);
    };
    const handleSelect = (value) => {
        console.log(`selected ${value}`);
    };
    const onFinish = (values) => {
        const formData = new FormData();
        // console.log(`here : ${fileList[0]}`);
        const courseUid = Math.random().toString(16).slice(2);
        formData.append('name', values.course_name);
        formData.append('id', courseUid);
        formData.append('code', values.course_code);
        formData.append('desc', values.syllabus);
        formData.append('othersinfo', values.marks_info);
        formData.append('instructor', userName);
        formData.append('creatorid', userUuid);
        formData.append('activeday', values.activeday);

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            data: formData,
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
    const dateFormat = 'MM/DD';
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
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="activeday"
                            label="Class Schedule : "
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Active days',
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                onChange={handleSelect}
                            >
                                {weekDays.map((v, i3) => (
                                    <Option key={i3 + 1}>{v}</Option>
                                ))}
                            </Select>
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
