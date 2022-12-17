/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

function CommonViewAssignment({ quiz }) {
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
                        <div
                            style={{
                                fontWeight: '600',
                            }}
                        >
                            <p>
                                Starting Time: {new Date(Number(quiz.time_start)).toLocaleString()}
                            </p>

                            <p>Ending Time: {new Date(Number(quiz.time_end)).toLocaleString()}</p>
                        </div>
                        <div className="mcq-status">
                            Status : {quizStatus ? 'Ended' : 'Running'}
                        </div>
                        <div
                            style={{
                                fontSize: '16px',
                                padding: '8px 0 8px 0',
                            }}
                        >
                            Total Marks : {quiz.marks}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommonViewAssignment;
