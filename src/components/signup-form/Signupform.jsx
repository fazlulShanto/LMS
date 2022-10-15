/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line prettier/prettier

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, message, Row, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

function SignupForm() {
    const navi = useNavigate();
    const [otpButton, setOtpButton] = useState(false);
    const [submitBtn, setSubmitBtn] = useState(true);
    const [form] = useForm();
    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        const { isTeacher } = values;
        const data = JSON.stringify({
            email: values.email,
            pwd: values.password,
            username: values.username,
            isTeacher: values.isTeacher,
            form_otp: values.form_otp,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };

        axios(config)
            .then((response) => {
                navi('/wait');
                // console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                // console.log('er');
                const msg = error.response.data.message;
                message.error(msg);
                // console.log();
            });
    };
    const sendOtp = () => {
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
                    setSubmitBtn(false);
                })
                .catch((error) => {
                    message.error(`Failed To sent OTP.Enter a valid Email.`);
                    console.log(error);
                });
        }
    };
    return (
        <div className="parent-login-form-container">
            <div className="login-form-container">
                {/* <Switch
                    className="dif"
                    checkedChildren="As a Student"
                    unCheckedChildren="As a Teacher"
                    defaultChecked
                /> */}
                <Form
                    form={form}
                    name="registration_form"
                    className="signup-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                                type: 'email',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your User Name',
                                type: 'string',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="User Name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        // hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
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
                            placeholder="confirm Password"
                        />
                    </Form.Item>
                    <Form.Item label="OTP" extra="Check Your Email for OTP">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="form_otp"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the OTP you got!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Button onClick={sendOtp} disabled={otpButton}>
                                    Get OTP
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="isTeacher" label="Register As A :" valuePropName="checked">
                        <Switch checkedChildren="Teacher" unCheckedChildren="Student" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="tos"
                            valuePropName="checked"
                            rules={[
                                {
                                    required: true,
                                    message: 'You have to agree with the ToS',
                                },
                            ]}
                            noStyle
                        >
                            <Checkbox>Accept terms & Conditions</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className="form-space-between">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            disabled={submitBtn}
                        >
                            Register
                        </Button>
                        <span className="register-now-div">Or</span>
                        <Link to="/login">Already have an account ? Log in!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default SignupForm;
