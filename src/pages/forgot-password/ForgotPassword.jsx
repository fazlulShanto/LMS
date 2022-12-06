/* eslint-disable no-unused-vars */
import { LockOutlined, MailFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword({ id }) {
    const [loading, setLoading] = useState(false);
    const [submitBtn, setSubmitBtn] = useState(true);
    const [form] = useForm();
    const sendOtp = () => {
        setLoading(true);
        const tempMail = form.getFieldValue('email');
        const mailEr = form.getFieldError('email');
        if (!mailEr.length) {
            // sent mail
            const data = JSON.stringify({
                to: form.getFieldValue('email'),
            });

            const config = {
                method: 'post',
                url: 'http://localhost:3003/api/register/otp',
                headers: {
                    'Content-Type': 'application/json',
                },
                data,
            };

            axios(config)
                .then((response) => {
                    message.success(`OTP sent. Check Your Email!`);
                    setLoading(false);
                    setSubmitBtn(false);
                })
                .catch((error) => {
                    console.log();
                    message.error(`Failed To sent OTP.Enter a valid Email.`);

                    setLoading(false);
                    console.log(form.getFieldValue('email'));
                });
        }
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        const data = JSON.stringify({
            email: values.email,
            pwd: values.confirm,
            form_otp: values.otp,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/register/reset-password',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };

        axios(config)
            .then((response) => {
                message.success('Password Changed successfully!');
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                // console.log(error?.response?.data?.message);
                // message.error(error.response.data);
                message.error(error?.response?.data?.message);
            });
    };

    return (
        <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: '80vh', width: '100%' }}
        >
            <Col span={8}>
                <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>Reset Password</h1>
                <Form form={form} name="registration_form" onFinish={onFinish}>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        required: true,
                                        message: 'Please input your Email',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailFilled className="site-form-item-icon" />}
                                    placeholder="Email"
                                />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Button
                                onClick={() => {
                                    sendOtp();
                                }}
                                type="primary"
                                loading={loading}
                            >
                                Get OTP
                            </Button>
                        </Col>
                    </Row>

                    <Form.Item
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your OTP',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="OTP"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your New Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="New Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        // hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your New  password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        setSubmitBtn(false);
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            'The two passwords that you entered do not match!'
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="confirm New Password"
                        />
                    </Form.Item>

                    <Form.Item className="form-space-between">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            disabled={submitBtn}
                        >
                            Set Password
                        </Button>
                        <span className="register-now-div">Or</span>
                        <Link to="/signup">Register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default ForgotPassword;
