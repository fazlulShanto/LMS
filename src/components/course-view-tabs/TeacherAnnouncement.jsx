/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { DeleteTwoTone } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TeacherAnnouncement({ cid }) {
    const [form] = useForm();
    const [announcement, setAnnounce] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleDelete = (postid) => {
        const data = JSON.stringify({
            cid,
            postid,
        });
        const config = {
            method: 'delete',
            url: 'http://localhost:3003/api/course/announcement',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };
        axios(config)
            .then((response) => {
                message.success('Success!');
                setLoading(!loading);
            })
            .catch((error) => {
                message.error('Failed!');
            });
    };
    const handleOk = () => {
        const { post } = form.getFieldsValue();
        const data = JSON.stringify({
            cid,
            post,
            date: new Date().toLocaleString(),
        });
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course/announcement',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };
        axios(config)
            .then((response) => {
                form.resetFields();
                message.success('Success!');
                setLoading(!loading);
                setOpen(false);
            })
            .catch((error) => {
                console.log(error);
                message.error('Failed!');
            });
    };
    useEffect(() => {
        const data = JSON.stringify({
            cid,
        });
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/course/announcement',
            headers: {
                'Content-Type': 'application/json',
                cid,
            },
        };
        axios(config)
            .then((response) => {
                setAnnounce(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [cid, loading]);
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button onClick={showModal}>Create new Announcement</Button>
            <Modal
                open={open}
                width="90vw"
                title="New Announcement"
                onOk={handleOk}
                onCancel={handleCancel}
                bodyStyle={{
                    height: 'auto',
                }}
                style={{
                    top: '16px',
                }}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="back1" type="primary" htmlType="submit" onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Form form={form}>
                    <Form.Item
                        name="post"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea rows={18} />
                    </Form.Item>
                </Form>
            </Modal>
            {announcement && (
                <div className="announcement-list-div">
                    {announcement.map((v) => (
                        <div className="single-announcement" key={v.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5>Posted on: {v.date}</h5>
                                <DeleteTwoTone
                                    twoToneColor="red"
                                    onClick={() => handleDelete(v.id)}
                                />
                            </div>
                            <hr />
                            <span style={{ whiteSpace: 'pre-wrap' }}>{v.post}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TeacherAnnouncement;
