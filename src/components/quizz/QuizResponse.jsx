/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ViewPDF from '../assignment/ViewPDF';
import ValidateSingleQuiz from './ValidateSingleQuiz';

function QuizResponse({ quiz }) {
    // console.log(quiz);
    const [stdInfo, setStdInfo] = useState(null);
    const [show, setShow] = useState(false);
    const [comp, setComp] = useState(null);
    const showModal = () => {
        setShow(true);
    };
    const handleOk = () => {
        setShow(false);
    };
    const handleCancel = () => {
        setShow(false);
    };
    const viewResponse = (info) => {
        // const mod = <ValidateSingleQuiz />;
        // console.log('hi', info);
        if (info.task_type === 'quiz') {
            setComp(
                <ValidateSingleQuiz
                    showModal={showModal}
                    handleCancel={handleCancel}
                    handleOk={handleCancel}
                    data={info}
                />
            );
        } else {
            setComp(
                <ViewPDF
                    showModal={showModal}
                    handleCancel={handleCancel}
                    handleOk={handleCancel}
                    data={info}
                />
            );
        }
        setShow(true);
    };

    useEffect(() => {
        if (quiz) {
            const myCall = async () => {
                const kd = quiz.examinees.map(async (v) => {
                    const { data } = await axios.get(
                        `http://localhost:3003/api/user/get/${v.studentid}`
                    );
                    // console.log(v);
                    const tempObj = {
                        key: Math.random(),
                        name: `${data.firstname} ${data.lastname}`,
                        taskid: quiz.taskid,
                        student_id: data.student_id,
                        task_type: quiz.task_type,
                        user_uuid: data.user_uuid,
                        response: v,
                        mcq: quiz.mcq,
                        short: quiz.short,
                        marks: quiz.marks,
                    };
                    return tempObj;
                });
                const dd = await Promise.all(kd);
                setStdInfo(dd);
            };
            myCall();
        }
    }, []);
    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'student_id',
            key: 'student_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            dataIndex: 'address',
            key: 'address',
            render: (_, info) => {
                // console.log(1, info);
                const pd = 34;
                return <Button onClick={() => viewResponse(info)}>View Answer</Button>;
            },
        },
    ];

    return (
        quiz && (
            <div className="quiz-response-container">
                <div>
                    <h3>Total Response Received : {quiz.examinees.length} </h3>
                </div>
                <div className="quiz-responses">
                    {stdInfo && (
                        <div key={Math.random()} className="single-quiz-response">
                            <Table dataSource={stdInfo} columns={columns} />
                        </div>
                    )}
                </div>
                {show && comp}
            </div>
        )
    );
}

export default QuizResponse;
