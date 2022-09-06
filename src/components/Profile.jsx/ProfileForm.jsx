/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Button, Col, DatePicker, Form, Input, message, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

function ProfileForm({ userId = 3 }) {
    const apiUrl = `http://localhost:3003/api/user/get/${userId}`;
    // const
    const proArray = [];
    const [form] = Form.useForm();
    const [afterLoad, setAfterLoad] = useState(false);
    const [oldData, setOldData] = useState({});
    const onFinish = (values) => {
        // console.log('Success:', values);
        const postUrl = `http://localhost:3003/api/user`;
        const config = {
            method: 'post',

            url: `${postUrl}/set/${userId}`,
            headers: { ...values },
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                message.success('Updated!', 0.5);
            })
            .catch((error) => {
                console.log(error);
            });

        // setAfterLoad(!afterLoad);
    };

    useEffect(() => {
        axios
            .get(apiUrl)
            .then(
                (res) => {
                    if (afterLoad) {
                        // console.log(res.data);
                        const {
                            first_name,
                            last_name,
                            phone,
                            email,
                            birth_date,
                            address,
                            student_id,
                            session,
                            hall_name,
                            blood_group,
                            bio,
                            fb,
                            github,
                        } = res.data;
                        console.log(new Date(birth_date));
                        // setOldData(res.data);
                        form.setFieldValue('first_name', first_name || '');
                        form.setFieldValue('last_name', last_name || '');
                        form.setFieldValue('phone', phone || '');
                        form.setFieldValue('email', email || '');

                        form.setFieldValue('p_addr', address || '');
                        form.setFieldValue('birth_date', moment(birth_date) || '');
                        form.setFieldValue('student_id', student_id || '');
                        form.setFieldValue('session', session || '');
                        form.setFieldValue('hall_name', hall_name || '');
                        form.setFieldValue('blood_group', blood_group || '');
                        form.setFieldValue('bio', bio || '');
                        form.setFieldValue('facebook_link', fb || '');
                        form.setFieldValue('github', github || '');
                        setOldData(res.data);
                    }

                    // handleReload(res.data);
                    // console.log(res.data.first_name);
                    setAfterLoad(true);
                    // console.log(`${oldData.id}here`);
                },
                [userId]
            )
            .catch((er) => console.log(er));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [afterLoad]);
    // setFirstName('hia');

    return (
        <Form layout="vertical" onFinish={onFinish} autoComplete="off" form={form}>
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
                        name="session"
                        label="session"
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
                        label="Github Profile Link"
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
