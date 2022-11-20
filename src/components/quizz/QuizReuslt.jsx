/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function QuizReuslt({ quiz }) {
    const { resultSheet } = quiz;
    const [pbuRes, setPubRes] = useState(quiz.final_result);
    let btnText = 'Publish Result';
    if (pbuRes) {
        btnText = 'UnPublish Result';
    }
    const [studentData, setStudentData] = useState(null);
    const handlePublish = () => {
        console.log('clicked');
        const data1 = JSON.stringify({
            taskid: quiz.taskid,
            status: Number(!pbuRes),
        });

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/task/publish',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data1,
        };
        // console.log(typeof pbuRes);

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setPubRes(!pbuRes);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (resultSheet) {
            const myCall = async () => {
                const kd = resultSheet.map(async (v) => {
                    const { data } = await axios.get(
                        `http://localhost:3003/api/user/get/${v.studentid}`
                    );

                    const tempObj = {
                        key: Math.random(),
                        name: `${data.firstname} ${data.lastname}`,
                        taskid: quiz.taskid,
                        student_id: data.student_id,
                        user_uuid: data.user_uuid,
                        marks: v.marks,
                    };
                    return tempObj;
                });
                const dd = await Promise.all(kd);
                // console.log(dd);
                setStudentData(dd);
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
            title: 'Marks',
            dataIndex: 'marks',
            key: 'marks',
        },
    ];

    return (
        studentData && (
            <div className="quiz-response-container">
                <div>
                    <Button onClick={handlePublish} type="primary" danger>
                        {btnText}
                    </Button>
                </div>

                <div key={Math.random()} className="single-quiz-response">
                    <Table dataSource={studentData} columns={columns} />
                </div>
            </div>
        )
    );
}

export default QuizReuslt;
