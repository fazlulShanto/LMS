/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseTeacherTask({ cid }) {
    const [taskList, setTaskList] = useState([]);
    const formateTaskList = (tl) => {
        if (tl?.length) {
            const ntl = tl.map((v) => {
                console.log(`end : ${v.time_end}\nstart=${Date.now()}`);
                let totalMarks = v.marks;
                if (v.type == 'quiz') {
                    totalMarks = (v.mcq.length + v.short.length) * v.marks;
                }
                const temp = {
                    key: Math.random(),
                    taskid: v.taskid,
                    task_title: v.task_title,
                    task_type: v.task_type,
                    marks: totalMarks,
                    status: Number(v.time_end) < Date.now() ? 'Ended' : 'Running',
                    students: v.examinees.length,
                };
                return temp;
            });
            return ntl;
        }
        return [];
    };
    const nav = useNavigate();
    const handleViewTask = (tid, tt) => {
        console.log(tid);
        if (tt === 'quiz') {
            nav(`/view-quiz/${tid}`);
        } else {
            nav(`/view-assignment/${tid}`);
        }
    };
    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/task',
            headers: {
                'Content-Type': 'application/json',
                courseid: cid,
            },
        };

        axios(config)
            .then((response) => {
                const ls = formateTaskList(response.data);
                setTaskList(ls);
                console.log(taskList);
                // console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [cid, taskList.length]);
    const tableColumn = [
        {
            title: 'Name',
            dataIndex: 'task_title',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Type',
            dataIndex: 'task_type',
            key: 'type',
        },
        {
            title: 'Total Marks',
            dataIndex: 'marks',
            key: 'marks',
        },
        {
            title: 'Responses',
            dataIndex: 'students',
            key: 'students',
        },
        {
            key: 'action',
            render: (_, rc) => (
                <Button type="primary" onClick={() => handleViewTask(rc.taskid, rc.task_type)}>
                    View Task
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={taskList}
                columns={tableColumn}
                bordered
                pagination={{
                    position: ['none', 'none'],
                }}
            />
        </div>
    );
}

export default CourseTeacherTask;
