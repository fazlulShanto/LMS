/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { Avatar, Button, List } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './coursepeopletab.css';

function RemoveBtn({ sid, txt, clickFnc }) {
    return (
        <Button onClick={() => clickFnc(sid)} type="primary" danger>
            {txt}
        </Button>
    );
}
function AllowBtn({ sid, txt, clickFnc }) {
    return (
        <Button onClick={() => clickFnc(sid)} type="primary">
            {txt}
        </Button>
    );
}
function StudentPeopleTab({ cid }) {
    const [tcher, setTeacher] = useState();
    const [approvedStudent, setApprovedStd] = useState([]);
    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/course/student/list',
            headers: {
                cid,
            },
        };

        axios(config)
            .then((response) => {
                const { approved, unAprroved, teacherInfo } = response.data;
                setApprovedStd(approved);
                setTeacher(teacherInfo);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid]);
    return (
        <div className="tab-people-container">
            <div className="tab-people-teacher-container">
                <h2>Teacher</h2>
                <hr />
                <List>
                    <List.Item className="course-people-list-item">
                        <List.Item.Meta
                            avatar={<Avatar src={`http://localhost:3003/users/${tcher?.id}.png`} />}
                            title={<Link to={`/profile/${tcher?.id}`}>{tcher?.name}</Link>}
                            description={tcher?.email}
                        />
                    </List.Item>
                </List>
            </div>

            {approvedStudent.length ? (
                <div className="Tab-people-student-container">
                    <h2>Students</h2>
                    <hr />
                    <List
                        itemLayout="horizontal"
                        dataSource={approvedStudent}
                        renderItem={(item) => (
                            <List.Item className="course-people-list-item">
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={`http://localhost:3003/users/${item?.id}.png`}
                                        />
                                    }
                                    title={<Link to={`/profile/${item.id}`}>{item.name}</Link>}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            ) : (
                <div
                    className="Tab-people-student-container"
                    style={{
                        width: '50vw',
                    }}
                >
                    <h2>Students:</h2>
                    <hr />
                    <div
                        style={{
                            padding: '12px 0px',
                        }}
                    >
                        There is no Student
                    </div>
                </div>
            )}
        </div>
    );
}

export default StudentPeopleTab;
