/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Button, message, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AdminLayout from './AdminLayout';

const { Column, ColumnGroup } = Table;
function PendingApproval() {
    const [reload, setReload] = useState(Date.now());
    const deleteRequest = (uid) => {
        console.log(`Deleted :${uid}`);
        const data = JSON.stringify({
            user_uuid: uid,
            verdict: false,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/admin//approval',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };

        axios(config)
            .then((response) => {
                setReload(Date.now());
                message.success(`${response.data.message}`);
            })
            .catch((error) => {
                message.error(`something wrong!`);
                console.log(error);
                setReload(Date.now());
            });
    };
    const acceptRequest = (uid) => {
        console.log(`Accepted :${uid}`);
        const data = JSON.stringify({
            user_uuid: uid,
            verdict: true,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/admin//approval',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };

        axios(config)
            .then((response) => {
                message.success(`${response.data.message}`);
                setReload(Date.now());
            })
            .catch((error) => {
                message.error(`something wrong!`);
                setReload(Date.now());
                console.log(error);
            });
    };
    const [listOfStudents, setListOfStudents] = useState([]);
    // const listOfStudents = [
    //     {
    //         name: 'naek',
    //         email: 'this is email',
    //         registeredAs: 'Teacher',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email2',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email3',
    //         registeredAs: 'Teacher',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email4',
    //         registeredAs: 'Teacher',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email5',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email6',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email7',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email8',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email9',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email9',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email9',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    //     {
    //         name: 'naek',
    //         email: 'this is email9',
    //         registeredAs: 'student',
    //         uid: Math.random().toString(36).slice(2),
    //     },
    // ];
    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/user/allunapproved',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setListOfStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reload]);
    return (
        <AdminLayout>
            <Table
                dataSource={listOfStudents}
                pagination={{
                    // defaultPageSize: 6,
                    hideOnSinglePage: true,
                    responsive: true,
                }}
                key={Math.random()}
            >
                {/* <Column title="Name" dataIndex="name" key="name" /> */}
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Role" dataIndex="role" key="role" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle" key={Math.random()}>
                            <Button
                                style={{
                                    backgroundColor: '#391085',
                                    color: 'white',
                                }}
                                key={Math.random()}
                                onClick={() => acceptRequest(record.user_uuid)}
                            >
                                Approve
                            </Button>
                            <Button
                                key={Math.random()}
                                style={{
                                    backgroundColor: '#ff4d4f',
                                    color: 'white',
                                }}
                                onClick={() => deleteRequest(record.user_uuid)}
                            >
                                Refuse
                            </Button>
                        </Space>
                    )}
                />
            </Table>
        </AdminLayout>
    );
}

export default PendingApproval;
