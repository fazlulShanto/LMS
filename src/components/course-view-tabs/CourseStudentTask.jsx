/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

function CourseStudentTask({ cid }) {
    const { userUuid } = useAuth();
    const [taskList, setTaskList] = useState([]);
    const [viewTask, setViewTask] = useState(false);

    const formateTaskList = (tl) => {
        if (tl?.length) {
            const ntl = tl.map((v) => {
                // console.log(`end : ${v.time_end}\nstart=${Date.now()}`);
                let attempt = false;
                let resultText = 'Absent';

                v.examinees.forEach((se) => {
                    if (se.studentid === userUuid) {
                        // console.log(`se`, se);
                        // console.log(`v`, v);
                        attempt = true;
                        if (v.final_result) {
                            resultText = 'Not Evaluated yet';
                            v.resultSheet.forEach((vv) => {
                                if (vv.studentid === se.studentid) {
                                    resultText = vv.marks;
                                }
                            });
                        } else {
                            // console.log(se);
                            resultText = 'Not Published yet';
                        }
                    }
                });
                const temp = {
                    key: Math.random(),
                    attempt,
                    resultText,
                    taskid: v.taskid,
                    task_title: v.task_title,
                    task_type: v.task_type,
                    marks: (v.mcq.length + v.short.length) * v.marks,
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
    const handleViewTask = (tid) => {
        console.log(tid);
        nav(`/view-quiz/${tid}`);
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
                // console.log(taskList);
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
            title: 'Result',
            key: 'students',
            dataIndex: 'resultText',
        },
        {
            key: 'action',
            render: (_, rc) => {
                const crSt = rc.status === 'Ended' || rc.attempt;
                return (
                    <Button
                        disabled={crSt}
                        type="primary"
                        onClick={() => handleViewTask(rc.taskid)}
                    >
                        View Task
                    </Button>
                );
            },
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

export default CourseStudentTask;
