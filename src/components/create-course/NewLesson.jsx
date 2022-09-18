/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import NewEditor from '../Editor/NewEditor';
import CourseAttachment from '../upload/CourseAttachment';
import CourseDropDown from './CourseDropDown';

const FormData = require('form-data');

function NewLesson({ handleTitle, handleDelta, courseUid }) {
    const [edi, setEdi] = useState({});
    const onFinish = (values) => {
        // console.log('Success:', values);
        // console.log(`real Delta :`, edi);

        const lessonObject = {
            title: values.lesson_title,
            delta: JSON.stringify(edi),
        };
        console.log(lessonObject);
        // const config = {
        //     method: 'post',
        //     url: 'http://localhost:3003/api/course/addlesson',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         // Accept: 'application/json, text/plain, /',
        //         // 'Content-Type': 'multipart/form-data',
        //         lessonId: Math.random().toString(16).slice(2),
        //         // course_uid: courseUid,
        //         title: values.lesson_title,
        //         delta: JSON.stringify(edi),
        //     },
        // };

        // axios(config)
        //     .then((response) => {
        //         console.log('res');
        //         if (response.status === 200) {
        //             message.success('added new  lesson');
        //             console.log(response);
        //         }
        //     })
        //     .catch((error) => {
        //         console.log('her');
        //         console.log(error);
        //     });
        const data = new FormData();
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course/addlesson',
            headers: {
                title: 'this is title',
                course_uid: '473f8eaaef713',
                lessonId: 'less1',
                delta: lessonObject.delta,
            },
            data,
        };
        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleChange = (ev) => {
        console.log(ev.target.value);
        // handleTitle(ev.target.value);
    };
    const handledelta = (delta) => {
        setEdi(delta);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div>
                <CourseDropDown />
            </div>

            <div>
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
            </div>
        </div>
    );
}

export default NewLesson;
