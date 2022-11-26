/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line prettier/prettier

import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useState } from 'react';

function ResetPassword({ id }) {
    const [submitBtn, setSubmitBtn] = useState(true);
    const [form] = useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        const data = JSON.stringify({
            old: values.old_password,
            new_pass: values.password,
            userid: id,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/register/change-password',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };

        axios(config)
            .then((response) => {
                const { message: msg } = response.data;
                form.resetFields();
                message.success(msg);
            })
            .catch((error) => {
                // console.log('er');
                const msg = error.response.data.message;
                message.error(msg);
                // console.log();
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
                <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>Change Password</h1>
                <Form form={form} name="registration_form" onFinish={onFinish}>
                    <Form.Item
                        name="old_password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Old Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Old Password"
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
                            Change Password
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default ResetPassword;
