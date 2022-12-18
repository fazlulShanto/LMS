/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function StudentSchedule({ id }) {
    const [courseSchedule, setCourseSchedule] = useState(null);

    const columns = [
        {
            title: 'Course Code',
            dataIndex: 'code',
            key: 'name',
        },
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'age',
        },
    ];

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/schedule',
            headers: {
                id,
            },
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setCourseSchedule(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    return (
        <div>
            <Table dataSource={courseSchedule} columns={columns} />
        </div>
    );
}

export default StudentSchedule;
