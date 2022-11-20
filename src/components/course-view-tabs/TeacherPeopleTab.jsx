/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { Avatar, Button, List, message } from 'antd';
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
function TeacherPeopleTab({ cid }) {
    const [rload, setRload] = useState(Date.now());
    const [tcher, setTeacher] = useState();
    const [approvedStudent, setApprovedStd] = useState([]);
    const [unApprovedStd, setUnApprovedStd] = useState([]);
    const handleAllow = (sid) => {
        const data = new FormData();
        data.append('cid', cid);
        data.append('student_id', sid);
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course/student/approve',
            headers: {},
            data,
        };
        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                message.success('Done!');
                setRload(Date.now());
            })
            .catch((error) => {
                console.log(error);
                message.error('Something wrong Happend!');
            });
    };
    const handleRemove = (sid) => {
        const data = new FormData();
        data.append('cid', cid);
        data.append('student_id', sid);
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course/student/remove',
            headers: {},
            data,
        };
        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                message.success('Done!');
                setRload(Date.now());
            })
            .catch((error) => {
                console.log(error);
                message.error('Something wrong Happend!');
            });
    };
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
                // console.log(approved);
                setUnApprovedStd(unAprroved);
                setTeacher(teacherInfo);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid, rload]);
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
                            <List.Item
                                className="course-people-list-item"
                                extra={
                                    <div>
                                        <RemoveBtn
                                            sid={item.id}
                                            txt="Remove"
                                            clickFnc={handleRemove}
                                        />
                                    </div>
                                }
                            >
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
            {unApprovedStd.length ? (
                <div className="Tab-people-student-container">
                    <h2>Pending Approvals</h2>
                    <hr />
                    <List
                        itemLayout="horizontal"
                        dataSource={unApprovedStd}
                        renderItem={(item) => (
                            <List.Item
                                className="course-people-list-item"
                                extra={
                                    <div>
                                        <AllowBtn
                                            sid={item.id}
                                            txt="Allow"
                                            clickFnc={handleAllow}
                                        />
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
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
                    <h2>Pending Approvals:</h2>
                    <hr />
                    <div
                        style={{
                            padding: '12px 0px',
                        }}
                    >
                        No Pending Request
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeacherPeopleTab;
