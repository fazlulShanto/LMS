import React from 'react';

import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="parent-login-form-container">
            <div className="login-form-container">
                <Form
                    name="forgotpassword"
                    className="login-form"
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
                            placeholder="Enter your Email"
                        />
                    </Form.Item>

                    <Form.Item className="form-space-between">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Reset my Password
                        </Button>
                        <span className="register-now-div">Or</span>
                        <Link to="/signup">Register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
export default ForgotPassword;
