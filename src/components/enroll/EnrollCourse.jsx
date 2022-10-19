/* eslint-disable no-unused-vars */
import { CodeOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import StudentLayout from '../default-layout/StudentLayout';

function EnrollCourse() {
    const [loading, setLoading] = useState(false);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
