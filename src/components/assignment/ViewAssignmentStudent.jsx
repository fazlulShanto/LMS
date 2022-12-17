/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentLayout from '../default-layout/StudentLayout';
import CommonViewAssignment from './CommonViewAssignment';
import SubmintAssignment from './SubmintAssignment';

function ViewAssignmentStudent({ tid }) {
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

    return (
        <StudentLayout>
            <CommonViewAssignment quiz={quiz} />
            <SubmintAssignment quiz={quiz} />
        </StudentLayout>
    );
}

export default ViewAssignmentStudent;
