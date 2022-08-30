/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line prettier/prettier

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './signup.css';

function SignupForm() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
                    name="registration_form"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="Email"
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
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Accept terms & Conditions</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className="form-space-between">
                        <Button type="primary" htmlType="submit" className="login-form-button">
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
