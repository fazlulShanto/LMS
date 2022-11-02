/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, InputNumber, message, Modal, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useState } from 'react';

function ValidateSingleQuiz({ handleOk, handleCancel, data }) {
    const [totalMarks, setTotalMarks] = useState(data.response.correct.length);
    const [loading, setLoading] = useState(false);
    const [form] = useForm();
    // console.log(data);
    const onFinish = (values) => {
        // const pd = form.getFieldsValue();
        // console.log(pd);
        // console.log('Success:', values);
        // handleOk();
        const mydata = JSON.stringify({
            taskid: data.taskid,
            studentid: data.user_uuid,
            marks: totalMarks,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/task/marks',
            headers: {
                'Content-Type': 'application/json',
            },
            data: mydata,
        };

        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                handleOk();
                message.success(`Done!`, 0.6);
            })
            .catch((error) => {
                console.log(error);
                message.error(`Failed!`, 0.5);
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const validateResult = (qid) => {
        const rtObj = {};
        let isCorrect = false;
        let userAns = [];
        data.response.correct.forEach((v) => {
            if (v.qid === qid) {
                isCorrect = true;
            }
        });
        if (!isCorrect) {
            data.response.incorrect.forEach((v) => {
                if (v.qid === qid) {
                    userAns = v.userans;
                }
            });
        }
        return {
            isCorrect,
            userAns,
        };
    };
    const getShortQA = (id) => {
        let rt;
        data.response.shortans.forEach((v) => {
            if (v.qid === id) {
                rt = v.ans;
            }
        });

        return rt;
    };
    const handleMarks = (ev) => {
        const test = Number(ev) || 0;
        const mcqMarks = data.response.correct.length;
        const vd = Object.values(form.getFieldsValue())
            .map((v) => {
                const temp = Number(v) > 0 ? Number(v) : 0;
                return temp;
            })
            .reduce((prev, nxt) => prev + nxt, mcqMarks);

        setTotalMarks(vd);
    };
    return (
        <Modal
            title={`${data.student_id} :${data.name}`}
            width="90vw"
            style={{
                overflowY: 'scroll',
                top: '16px',
            }}
            open
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="result" style={{ backgroundColor: '#001529', color: 'white' }}>
                    Total Marks : {totalMarks}
                </Button>,
                <Button key="back" type="primary" danger onClick={handleCancel}>
                    Close
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    onClick={onFinish}
                >
                    Submit
                </Button>,
            ]}
        >
            <div>
                {data && (
                    <Form
                        form={form}
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
                        <div className="quiz-submit-div">
                            <div>
                                {data.mcq.map((sq, idx) => {
                                    const options = [
                                        { label: sq.option1, value: 1 },
                                        { label: sq.option2, value: 2 },
                                        { label: sq.option3, value: 3 },
                                        { label: sq.option4, value: 4 },
                                    ];
                                    // console.log(`id : ${idx}`, sq.ans);

                                    const userAns = validateResult(sq.id);
                                    if (userAns.isCorrect) {
                                        sq.ans.forEach((v) => {
                                            options[v - 1].ans = true;
                                        });
                                    } else {
                                        userAns.userAns.forEach((v) => {
                                            options[v - 1].ans = true;
                                        });
                                    }
                                    let clsName = 'incorrect-mcq';

                                    const objStyle = {
                                        style: {
                                            height: '25px',
                                            fontSize: '16px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            borderRadius: '4px',
                                            paddingTop: '2px',
                                        },
                                    };
                                    let tag = (
                                        <Tag
                                            icon={<CloseCircleOutlined />}
                                            {...objStyle}
                                            color="error"
                                        >
                                            Wrong
                                        </Tag>
                                    );

                                    if (userAns.isCorrect) {
                                        clsName = 'correct-mcq';
                                        objStyle.style.backgroundColor = 'green';
                                        tag = (
                                            <Tag
                                                icon={<CheckCircleOutlined />}
                                                color="success"
                                                {...objStyle}
                                            >
                                                Correct
                                            </Tag>
                                        );
                                    }

                                    return (
                                        // <div key={Math.random()}>
                                        <div key={Math.random()}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <h3>
                                                    Question {idx + 1}: {sq.question}
                                                </h3>
                                                {tag}
                                            </div>

                                            <div
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr',
                                                }}
                                                className="viewquizteacher-mcq"
                                            >
                                                {options.map((v) => (
                                                    <Checkbox key={Math.random()} checked={v.ans}>
                                                        {v.label}
                                                    </Checkbox>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                                {data.short.map((sq, idx) => {
                                    const acData = getShortQA(sq.id);
                                    return (
                                        <div key={Math.random()} className="shortq-div-mark">
                                            <div
                                                className="short-question shortq-ans-question"
                                                key={Math.random()}
                                            >
                                                <h3 className="short-question">
                                                    Question {data.mcq.length + idx + 1}:{' '}
                                                    {sq.shortq}
                                                </h3>
                                                <h4>Answer:</h4>
                                                <p>{acData}</p>
                                            </div>
                                            <div className="shortq-ans-marks">
                                                <Form.Item key={Math.random()} name={sq.id}>
                                                    <InputNumber
                                                        type="number"
                                                        max={data.marks}
                                                        min={0}
                                                        value={0}
                                                        onChange={(num) => {
                                                            handleMarks(num);
                                                        }}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
                    </Form>
                )}
            </div>
        </Modal>
    );
}

export default ValidateSingleQuiz;
