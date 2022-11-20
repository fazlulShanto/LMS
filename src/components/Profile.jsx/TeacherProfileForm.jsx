/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Button, Col, DatePicker, Form, Input, message, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';

function TeacherProfileForm({ data }) {
    const { userUuid } = useAuth();
    const apiUrl = `http://localhost:3003/api/user/get/${userUuid}`;
    // const
    const proArray = [];
    const [form] = Form.useForm();
    const [afterLoad, setAfterLoad] = useState(false);
    const [oldData, setOldData] = useState({});
    const onFinish = (values) => {
        // console.log('Success:', values);
        const postUrl = `http://localhost:3003/api/user`;
        let formData = JSON.stringify({
            uuid: userUuid,
            ...values,
        });

        let config = {
            method: 'post',
            url: 'http://localhost:3003/api/user/set',
            headers: {
                'Content-Type': 'application/json',
            },
            data: formData,
        };

        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                localStorage.setItem('userName', values.firstname);
                message.success('Profile Updated!');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // console.log(data);
    // if (data) {
    //     const {
    //         firstname,lastname,phone,email,birthdate,permanentaddr,student_id,
    //         session,hall,bloodgroup,bio,fblink,githublink,
    //     } = data;
    //     form.setFieldValue('first_name', firstname || '');
    if (data) {
        // eslint-disable-next-line no-param-reassign
        data.birthdate = moment(new Date(data.birthdate), 'DD/MM/YYYY');
    }
    return data ? (
        <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            initialValues={data}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="firstname"
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
                        name="lastname"
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
                        <Input addonBefore="+880" placeholder="Please enter Phone Number" />
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
                        name="designation"
                        label="Designation"
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
                        name="bloodgroup"
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
                <Col span={12}>
                    <Form.Item
                        name="birthdate"
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
                        name="permanentaddr"
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
                <Col span={24}>
                    <Form.Item
                        name="bio"
                        label="Bio"
                        rules={[
                            {
                                required: false,
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
                        name="fblink"
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
                        name="githublink"
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
    ) : (
        <div />
    );
}

export default TeacherProfileForm;
