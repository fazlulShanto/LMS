/* eslint-disable no-unused-vars */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import React, { useState } from 'react';
import NewEditor from '../Editor/NewEditor';
import CourseAttachment from '../upload/CourseAttachment';
// import Editor from '../Editor/Editor';

import './addLesson.css';

function AddLesson({ handleTitle, handleDelta }) {
    const [open, setOpen] = useState(false);
    const [edi, setEdi] = useState({});
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
            delta: edi,
        };
        console.log(lessonObject);
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
