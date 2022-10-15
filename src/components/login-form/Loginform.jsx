/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import './loginform.css';

function Loginform() {
    const navi = useNavigate();
    const { setUserUuid, setUserRole, setLoggedIn } = useContext(AuthContext);
    const onFinish = (values) => {
        // console.log('Success:', values);
        const data = JSON.stringify({
            email: values.email,
            pwd: values.password,
        });
        // console.log(data);
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/auth',
            headers: {
                withCredentials: true,
                'Content-Type': 'application/json',
            },
            data,
        };

        axios(config)
            .then((response) => {
                // console.log(response.data.message);
                if (response.data.message === 'ok') {
                    // console.log(response.data);
                    // console.log(JSON.stringify(response.data));
                    const { user_uuid, accessToken, roles } = response.data;
                    setUserUuid(user_uuid);
                    setUserRole(JSON.stringify(roles));
                    setLoggedIn(true);
                    localStorage.setItem('user_uuid', user_uuid);
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('loggedIn', true);
                    // message.success('User Logged in');
                    navi('/');
                }
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem('user_uuid');
                localStorage.removeItem('accessToken');
                const unApproved = error.response.data.message.includes('Approved');
                if (unApproved) {
                    navi('/wait');
                } else {
                    message.error('failed to log in');
                }
                // console.log(error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="parent-login-form-container">
            <div className="login-form-container">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
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
                            minLength={1}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Link className="login-form-forgot" to="/forgotpass">
                            Forgot password
                        </Link>
                    </Form.Item>

                    <Form.Item className="form-space-between">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <span className="register-now-div">Or</span>
                        <Link to="/signup">Register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default Loginform;
