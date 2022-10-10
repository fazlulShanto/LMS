/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ViewQuiz({ quizid = 'abc' }) {
    const [quiz, setQuiz] = useState(null);
    const [valid, setValid] = useState(true);
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

    const onFinish = (values) => {
        console.log('Success:', values);
        // console.log(quiz.publish_result);
        // setIsModalOpen(quiz.publish_result);

        const data = new FormData();
        data.append('userid', Math.random().toString(36).slice(2));
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
            })
            .catch((er) => {
                console.log(er);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // console.log(loc);
    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://localhost:3003/api/task/${loc}`,
            headers: {},
        };

        axios(config)
            .then((response) => {
                setQuiz(response.data);
                const last_time = new Date(parseInt(response.data.time_end, 10));
                const current = Date.now();

                setValid(current < last_time);

                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [loc]);

    return (
        quiz && (
            <div>
                <div className="quiz-meta-info">
                    <h1>Course Title : {quiz.course_id} </h1>
                    <h2>Quiz Title : {quiz.task_title}</h2>
                </div>
                {valid ? (
                    <div>
                        <div className="quiz-timing">
                            <p>Starting Time : {timeDate(quiz.time_start)} </p>
                            <p>Ending Time : {timeDate(quiz.time_end)} </p>
                            <p>
                                Total Marks : {quiz.mcq.length + quiz.short.length} * {quiz.marks} ={' '}
                                {(quiz.mcq.length + quiz.short.length) * quiz.marks}
                            </p>
                        </div>
                        <Form
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
                                                        <Checkbox value={v.value}>
                                                            {v.label}
                                                        </Checkbox>
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
                ) : (
                    <div>
                        <h2>Time Over.Contact with course Teacher.</h2>
                    </div>
                )}
            </div>
        )
    );
}

export default ViewQuiz;
