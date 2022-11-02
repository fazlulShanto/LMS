/* eslint-disable no-unused-vars */
import { Result, Tabs } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../default-layout/DefaultLayout';
import QuizResponse from '../quizz/QuizResponse';
import QuizReuslt from '../quizz/QuizReuslt';
import TeacherViewQuiz from '../quizz/TeacherViewQuiz';

function TeacherTaskViewTab({ tid }) {
    const [okCourse, setOkCourse] = useState(true);
    const [quiz, setQuiz] = useState(null);
    const setOk = (val) => {
        setOkCourse(val);
    };
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tid]);
    const tabItems = [
        {
            label: 'View Task',
            key: '1',
            children: <TeacherViewQuiz quiz={quiz} />,
        },
        {
            label: 'Responses',
            key: '2',
            children: <QuizResponse quiz={quiz} />,
            disabled: false,
        },
        {
            label: 'Result',
            key: '3',
            children: <QuizReuslt quiz={quiz} />,
        },
    ];

    return (
        <DefaultLayout>
            {okCourse ? (
                <Tabs defaultActiveKey="1" tabBarGutter="24" centered items={tabItems} />
            ) : (
                <Result status="error" title="No Such course Exist" />
            )}
        </DefaultLayout>
    );
}

export default TeacherTaskViewTab;
