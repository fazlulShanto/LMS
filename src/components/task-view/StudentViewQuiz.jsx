/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../quizz/teacherViewmcq.css';

import { useLocation } from 'react-router-dom';
import StudentLayout from '../default-layout/StudentLayout';
import SubmitQuiz from '../quizz/SubmitQuiz';

function StudentViewQuiz() {
    const [pubRes, setPubres] = useState(true);
    const [quizStatus, setQuizStatus] = useState(true);
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
                setQuizStatus(Number(response.data.time_end) < Date.now());
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tid]);
    return (
        <StudentLayout>
            {quiz && (
                <div>
                    <div className="quiz-info-card">
                        <div>
                            <h2 style={{ color: 'white' }}>Title: {quiz.task_title}</h2>
                        </div>
                        <div className="mcq-st-ed-time">
                            <span>
                                Starting Time: {new Date(Number(quiz.time_start)).toLocaleString()}
                            </span>
                            <span>
                                Ending Time: {new Date(Number(quiz.time_end)).toLocaleString()}
                            </span>
                        </div>
                        <div className="mcq-status">
                            Status : {quizStatus ? 'Ended' : 'Running'}
                        </div>
                        <div>
                            Total Marks : {quiz.mcq.length + quiz.short.length} * {quiz.marks} ={' '}
                            {(quiz.mcq.length + quiz.short.length) * quiz.marks}
                        </div>
                    </div>
                    <div className="quiz-questions-div">
                        <SubmitQuiz quiz={quiz} />
                    </div>
                </div>
            )}
        </StudentLayout>
    );
}

export default StudentViewQuiz;
