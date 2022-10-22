/* eslint-disable no-unused-vars */
import { CodeOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import StudentLayout from '../default-layout/StudentLayout';

function EnrollCourse() {
    const { userUuid } = useAuth();
    const [loading, setLoading] = useState(false);
    const [successTitle, setSucTitle] = useState('Success');

    const successModal = () => {
        Modal.success({
            title: successTitle,
            content: 'Wait till the course teacher approve your request.',
        });
    };
    const errorModal = (msg) => {
        Modal.error({
            title: 'Failed',
            content: msg || 'There is no course associated with this code!',
        });
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const data = new FormData();
        data.append('cid', values.classCode);
        data.append('student_id', userUuid);

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course/student/join-request',
            headers: {},
            data,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setLoading(false);
                successModal();
            })
            .catch((er) => {
                const { error } = er.response.data;
                setLoading(false);
                errorModal(error);
            });
        setLoading(true);
    };

    return (
        <StudentLayout>
            <div
                style={{
                    width: '100%',
                    height: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div>
                    <Form
                        name="forgotpassword"
                        style={{
                            width: '300px',
                        }}
                        onFinish={onFinish}
                    >
                        <p
                            style={{
                                fontSize: '16px',
                            }}
                        >
                            Enter a Class Code:
                        </p>
                        <Form.Item
                            name="classCode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please inter a class Code',
                                },
                            ]}
                        >
                            <Input
                                prefix={<CodeOutlined className="site-form-item-icon" />}
                                placeholder="Enter Class Code"
                            />
                        </Form.Item>

                        <Form.Item className="form-space-between">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={loading}
                            >
                                Enroll
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </StudentLayout>
    );
}

export default EnrollCourse;
