/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
        setComp(
            <ValidateSingleQuiz
                showModal={showModal}
                handleCancel={handleCancel}
                handleOk={handleCancel}
                data={info}
            />
        );
        setShow(true);
    };
    useEffect(() => {
        if (quiz) {
            const myCall = async () => {
                const kd = quiz.examinees.map(async (v) => {
                    const { data } = await axios.get(
                        `http://localhost:3003/api/user/get/${v.studentid}`
                    );

                    const tempObj = {
                        key: Math.random(),
                        name: data.username,
                        taskid: quiz.taskid,
                        student_id: data.student_id,
                        user_uuid: data.user_uuid,
                        response: v.response,
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
            render: (_, info) => (
                // console.log(text);
                <Button onClick={() => viewResponse(info)}>View Answer</Button>
            ),
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
