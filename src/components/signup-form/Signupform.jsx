/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { MailFilled, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function Signupform() {
    return (
        <div className="formContainer">
            <Form {...layout} colon={false} className="ff" autoComplete="off">
                <h1>Sign Up</h1>
                <Form.Item name="email" label="">
                    <Input placeholder="Enter your Email" type="email" prefix={<MailFilled />} />
                </Form.Item>
                <Form.Item name="name" label="">
                    <Input placeholder="Enter your Name" size="large" prefix={<MailOutlined />} />
                </Form.Item>
                <Form.Item name="stdid" label="">
                    <Input placeholder="Enter your Student ID(ex: CE17000)" maxLength={7} />
                </Form.Item>
                <Form.Item name="phoneNumber" label="">
                    <Input placeholder="Enter your Phone Number" type="number" />
                </Form.Item>
                <Form.Item name="password" label="">
                    <Input placeholder="Enter your Password" type="password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" size="small" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Signupform;
