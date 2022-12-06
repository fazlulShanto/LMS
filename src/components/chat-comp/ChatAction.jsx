/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

function ChatAction({ chat, sender, receiver, title, setSendMessage, receiveMessage }) {
    const [messages, setMessages] = useState(null);
    const [typing, setTyping] = useState('');
    const scroll = useRef();
    const [form] = Form.useForm();
    const messageInput = (ev) => {
        const { value } = ev.target;
        setTyping(value);
        // console.log(value);
    };
    // console.log(chat);
    const avatarLink = `http://localhost:3003/users/${receiver}.png`;

    const onFinish = (values) => {
        // console.log('Success:', values);

        const newMessage = {
            senderid: sender,
            text: values.msg,
            chatid: chat._id,
        };
        // save the data to mongodb
        try {
            const data = JSON.stringify(newMessage);

            const config = {
                method: 'post',
                url: 'http://localhost:3003/api/message',
                headers: {
                    'Content-Type': 'application/json',
                },
                data,
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setMessages([...messages, newMessage]);
                    form.resetFields();
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }

        // send message to socket server

        setSendMessage({ ...newMessage, receiverid: receiver });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // always scroll to last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    useEffect(() => {
        if (receiveMessage != null && receiveMessage.chatid == chat._id) {
            setMessages([...messages, receiveMessage]);
        }
    }, [receiveMessage, receiver]);
    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://localhost:3003/api/message/${chat._id}`,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios(config)
            .then((response) => {
                // console.log(response.data);
                setMessages(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [receiver]);
    return (
        <div className="chat-action-cotainer-div">
            <div className="sticky">
                <div className="chat-avatar-card chat-action-heading">
                    <Avatar src={avatarLink} size={40} />
                    <h1 className="chat-avatar-title">{title}</h1>
                </div>
                <hr width="90%" color="white" />
            </div>
            <div className="chat-text-and-input-div">
                <div className="chat-text-cotainer">
                    {messages?.map((v) => (
                        <div
                            ref={scroll}
                            key={Math.random()}
                            className={v.senderid === sender ? 'chat-message own' : 'chat-message'}
                        >
                            <span>{v.text}</span>
                            <span className="message-time">{moment(v.createdAt).fromNow()}</span>
                        </div>
                    ))}
                </div>
                <div className="chat-input-div">
                    <Form
                        form={form}
                        layout="horizontal"
                        style={{
                            width: '100%',
                        }}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row>
                            <Col span={20}>
                                <Form.Item
                                    name="msg"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input.TextArea autoSize />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    style={{
                                        float: 'right',
                                    }}
                                >
                                    <Button
                                        icon={<SendOutlined />}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Send
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ChatAction;
