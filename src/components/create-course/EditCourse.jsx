/* eslint-disable no-unused-vars */
import { Button, Col, Form, Input, message, Row, Space } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import CourseDropDown from './CourseDropDown';

import './createcourse.css';
// import Editor from '../Editor/Editor';

function EditCourse() {
    const [form] = Form.useForm();
    const [courseInfo, setCourseInfo] = useState('');
    const [courseUid, setCourseUid] = useState('');
    const [disableForm, setDisableForm] = useState(true);

    const handleChange = (v, av) => {
        setCourseInfo(av);
    };
    const onFinish = (values) => {
        console.log(values);
        console.log(courseInfo);

        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/course',
            headers: {
                'Access-Control-Allow-Origin': '*',
                id: courseUid,
                name: values.course_name,
                code: values.course_code,
                desc: values.syllabus,
                othersinfo: values.marks_info,
                instructor: 'Teacher Name',
            },
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    message.success('Course Updated');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onSelect = (selected) => {
        setDisableForm(false);
        setCourseUid(selected);
        axios
            .get('http://localhost:3003/api/course', {
                headers: {
                    id: selected,
                },
            })
            .then((res) => {
                setCourseInfo(res.data);

                form.setFieldValue('course_code', res.data.code || '');
                form.setFieldValue('course_name', res.data.name || '');
                form.setFieldValue('syllabus', res.data.desc || '');
                form.setFieldValue('marks_info', res.data.othersinfo || '');
                console.log(res.data);
            })
            .catch((er) => console.log(er));
        // console.log(selected);
    };

    return (
        <div className="create-Course-container">
            <Row>
                <Col span={16}>
                    <CourseDropDown detectSelect={onSelect} />
                </Col>
            </Row>
            <Form
                form={form}
                disabled={disableForm}
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

export default EditCourse;
