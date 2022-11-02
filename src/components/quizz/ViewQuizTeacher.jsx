/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { Button, Checkbox } from 'antd';
import React, { useState } from 'react';

function ViewQuizTeacher({ quiz }) {
    const [viewAns, setViewAns] = useState(false);
    const [btnText, setBtnText] = useState('View Answer');

    const handleViewAns = () => {
        if (!viewAns) {
            setBtnText('Hide Answer');
        } else {
            setBtnText('View Answer');
        }
        setViewAns(!viewAns);
    };
    const timeDate = (ms) => {
        if (typeof ms === 'string') {
            ms = parseInt(ms, 10);
        }
        const origin = new Date(ms);
        const date = origin.toLocaleDateString();
        const time = origin.toLocaleTimeString();

        return `${date} ${time}`;
    };

    return (
        quiz && (
            <div>
                <div
                    style={{
                        marginTop: '8px',
                    }}
                >
                    <Button type="primary" danger onClick={handleViewAns}>
                        {btnText}
                    </Button>
                </div>
                <div className="quiz-submit-div">
                    <div>
                        {quiz.mcq.map((sq, idx) => {
                            const options = [
                                { label: sq.option1, value: 1 },
                                { label: sq.option2, value: 2 },
                                { label: sq.option3, value: 3 },
                                { label: sq.option4, value: 4 },
                            ];
                            // console.log(`id : ${idx}`, sq.ans);
                            sq.ans.forEach((v) => {
                                options[v - 1].ans = true;
                            });

                            return (
                                <div key={Math.random()}>
                                    <h3>
                                        Question {idx + 1}: {sq.question}
                                    </h3>

                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                        }}
                                        className="viewquizteacher-mcq"
                                    >
                                        {options.map((v) => (
                                            <Checkbox
                                                key={Math.random()}
                                                checked={v.ans && viewAns}
                                            >
                                                {v.label}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {quiz.short.map((sq, idx) => (
                            <div className="short-question" key={Math.random()}>
                                <h3 className="short-question">
                                    Question {quiz.mcq.length + idx + 1}: {sq.shortq}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
}

export default ViewQuizTeacher;
