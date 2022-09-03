/* eslint-disable no-unused-vars */
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import React from 'react';

function ProfileForm() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter First name',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter First name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter last name',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Last name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Your Phone Number',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Phone Number" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Email',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Email" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="birth_date"
                        label="Birth Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the Birth Date',
                            },
                        ]}
                    >
                        <DatePicker
                            placeholder="Please choose the Birth Date"
                            style={{
                                width: '100%',
                            }}
                            // getPopupContainer={(trigger) => trigger.parentElement}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="p_addr"
                        label="Permanent Address"
                        rules={[
                            {
                                required: false,
                                message: 'This field data is missing',
                            },
                        ]}
                    >
                        <Input placeholder="Permanent Address" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="student_id"
                        label="Student Id"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Your Student Id',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Student Id" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="sesstion"
                        label="sesstion"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your sesstion',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter sesstion" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="hall_name"
                        label="Hall Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Your Hall Name',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Hall Name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="blood_group"
                        label="Blood Group"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Blood Group',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Blood Group" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="bio"
                        label="Bio"
                        rules={[
                            {
                                required: true,
                                message: 'please enter  description',
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="please enter description" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="facebook_link"
                        label="Facebook Profile Link"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input placeholder="Facebook Profile Link" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="github"
                        label="Last Name"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input placeholder="Please enter Github profile link" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default ProfileForm;
