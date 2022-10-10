/* eslint-disable no-unused-vars */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, message, Row, Space } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import NewEditor from '../Editor/NewEditor';
import CourseAttachment from '../upload/CourseAttachment';
// import Editor from '../Editor/Editor';

import './addLesson.css';

function AddLesson({ handleTitle, handleDelta, courseUid }) {
    const [open, setOpen] = useState(false);
    const [edi, setEdi] = useState({});
    const [studyMaterial, setStudyMaterial] = useState({});
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const handleChange = (ev) => {
        console.log(ev.target.value);
        // handleTitle(ev.target.value);
    };
    const handledelta = (delta) => {
        setEdi(delta);
    };
    const onFinish = (values) => {
        // console.log('Success:', values);
        // console.log(`real Delta :`, edi);

        const lessonObject = {
            title: values.lesson_title,
            delta: JSON.stringify(edi),
        };
        // console.log(lessonObject);
        const bodyFormData = new FormData();
        bodyFormData.append('title', lessonObject.title);
        bodyFormData.append('delta', lessonObject.delta);
        bodyFormData.append('resources', studyMaterial);
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course/addlesson',
            headers: {
                course_uid: courseUid,
                lessonid: Math.random().toString(16).slice(2),
                'Content-Type': 'multipart/form-data',
            },
            data: bodyFormData,
        };
        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    message.success('added new  lesson');
                    console.log(response);
                }
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

        setOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="atchm">
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New Lesson
            </Button>
            <Drawer
                title="Create a new Lesson"
                width="80%"
                onClose={onClose}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        {/* <Button onClick={onClose} type="primary">
                            Submit
                        </Button> */}
                    </Space>
                }
            >
                <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="lesson_title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Lesson Title',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter Lesson Title" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <NewEditor handleChange={handledelta} />
                    </Form.Item>
                    <Form.Item className="atchm">
                        <CourseAttachment />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}

export default AddLesson;
