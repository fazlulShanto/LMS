/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { Button, Checkbox, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

function SubmitQuiz({ quiz }) {
    const { userUuid } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const loc = useLocation().pathname.split('/').pop();
    const timeDate = (ms) => {
        if (typeof ms === 'string') {
            ms = parseInt(ms, 10);
        }
        const origin = new Date(ms);
        const date = origin.toLocaleDateString();
        const time = origin.toLocaleTimeString();

        return `${date} ${time}`;
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [antdform] = useForm();
    const nav = useNavigate();

    const onFinish = (values) => {
        // console.log('Success:', values);
        const data = new FormData();
        data.append('userid', userUuid);
        data.append('taskid', quiz.taskid);
        const ans = Object.keys(values).map((v) => ({
            qid: v,
            ans: values[v],
        }));
        // ans.userid = Math.random().toString(36).slice(2);
        data.append('response', JSON.stringify(ans));
        const config = {
            method: 'post',
            url: `http://localhost:3003/api/task/response`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data,
        };
        axios(config)
            .then((resp) => {
                // const = resp.data;
                const { correct } = resp.data;
                setModalText(correct);
                // console.log(resp.data);
                setIsModalOpen(quiz.publish_result);
                // console.log(resp);
                message.success(`Your Response has sent successfully!`, 0.8);
                antdform.resetFields();
                nav(`/course/${quiz.course_id}`);
            })
            .catch((er) => {
                console.log(er);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error(`Failed!\nPlease Try agian!`, 0.8);
    };
    return (
        quiz && (
            <div className="quiz-submit-div">
                <Form
                    form={antdform}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {quiz.mcq.map((sq, idx) => {
                        const options = [
                            { label: sq.option1, value: 1 },
                            { label: sq.option2, value: 2 },
                            { label: sq.option3, value: 3 },
                            { label: sq.option4, value: 4 },
                        ];

                        return (
                            <div key={Math.random()}>
                                <h3>
                                    {' '}
                                    Question {idx + 1}: {sq.question}{' '}
                                </h3>
                                <Form.Item name={sq.id} key={Math.random() + Math.random()}>
                                    <Checkbox.Group>
                                        {options.map((v) => (
                                            <div key={Math.random()}>
                                                <Checkbox value={v.value}>{v.label}</Checkbox>
                                            </div>
                                        ))}
                                    </Checkbox.Group>
                                </Form.Item>
                            </div>
                        );
                    })}
                    {quiz.short.map((sq, idx) => (
                        <div className="short-question" key={Math.random()}>
                            <h3 className="short-question">
                                Question {quiz.mcq.length + idx + 1}: {sq.shortq}
                            </h3>
                            <Form.Item name={sq.id} key={Math.random()}>
                                <Input.TextArea autoSize maxLength={200} showCount />
                            </Form.Item>
                        </div>
                    ))}

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Modal
                    cancelButtonProps={{ style: { display: 'none' } }}
                    title="Quiz Result : "
                    open={isModalOpen}
                    closable={false}
                    onOk={handleOk}
                >
                    <p>Result : {modalText} </p>
                </Modal>
            </div>
        )
    );
}

export default SubmitQuiz;
