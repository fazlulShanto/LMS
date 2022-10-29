/* eslint-disable no-unused-vars */
import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './teacherViewmcq.css';

import { useLocation } from 'react-router-dom';
import DefaultLayout from '../default-layout/DefaultLayout';

function TeacherViewQuiz() {
    const [pubRes, setPubres] = useState(true);
    const [quiz, setQuiz] = useState(null);
    const tid = useLocation().pathname.split('/').pop();
    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://localhost:3003/api/task/${tid}`,
            headers: {},
        };
        axios(config)
            .then((response) => {
                setQuiz(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [tid]);
    const handlePublish = () => {
        console.log('publishing');
    };
    return (
        <DefaultLayout>
            {quiz && (
                <div>
                    <div>
                        <h3>Title: {quiz.task_title}</h3>
                    </div>
                    <div className="mcq-st-ed-time">
                        <span>
                            Starting Time: {new Date(Number(quiz.time_start)).toLocaleString()}
                        </span>
                        <span>Ending Time: {new Date(Number(quiz.time_end)).toLocaleString()}</span>
                    </div>
                    <div className="mcq-status">
                        status : {Number(quiz.time_end) < Date.now() ? 'Ended' : 'Running'}
                    </div>
                    <div>
                        Total Marks : {quiz.mcq.length + quiz.short.length} * {quiz.marks} ={' '}
                        {(quiz.mcq.length + quiz.short.length) * quiz.marks}
                    </div>
                    <div>Responses : {quiz.examinees?.length}</div>
                    <div>
                        <Button
                            onClick={handlePublish}
                            type="primary"
                            danger
                            disabled={quiz.final_result}
                        >
                            Publish Result
                        </Button>
                    </div>
                    {quiz.examinees.length ? <div>no response</div> : <div />}
                </div>
            )}
        </DefaultLayout>
    );
}

export default TeacherViewQuiz;
