/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './teacherViewmcq.css';

import { useLocation } from 'react-router-dom';
import ViewQuizTeacher from './ViewQuizTeacher';

function TeacherViewQuiz({ quiz }) {
    const [pubRes, setPubres] = useState(true);
    // const quizStatus = true;
    const quizStatus = Number(quiz?.time_end) < Date.now();
    const tid = useLocation().pathname.split('/').pop();

    return (
        <div>
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
                        <ViewQuizTeacher quiz={quiz} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeacherViewQuiz;
