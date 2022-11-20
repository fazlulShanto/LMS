/* eslint-disable no-unused-vars */
import { FacebookFilled, GithubFilled, PhoneFilled } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import useAuth from '../../Hooks/useAuth';
import './profile.css';
import TeacherProfileForm from './TeacherProfileForm';
import UploadImage from './UploadImage';

function EditTeacherProfile() {
    const { userUuid } = useAuth();
    const [userData, setUserdata] = useState();
    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://localhost:3003/api/user/get/${userUuid}`,
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const pd = JSON.stringify(response.data);
                setUserdata(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userUuid]);
    return (
        <Row>
            <Col span={4}>
                <div className="profileCardContainer">
                    <div className="profile_photo_div">
                        <img
                            src={`http://localhost:3003/users/${userUuid}.png`}
                            alt=""
                            className="profile_photo"
                        />
                        <div className="upload-icon-div">
                            <UploadImage userid={userUuid} />
                        </div>
                    </div>

                    <div className="profileStatsDiv">
                        <div className="test1">
                            {userData?.firstname} {userData?.lastname}
                        </div>
                        <div className="test1">Designation : {userData?.designation}</div>
                        <div className="test1">
                            <PhoneFilled /> : {userData?.phone}
                        </div>
                        <div>
                            <h4 className="test1">Social Networks</h4>
                            <div className="socialIconDiv">
                                <Button
                                    type="link"
                                    href={userData?.fblink}
                                    icon={<FacebookFilled className="socialIconItem" />}
                                />

                                <Button
                                    type="link"
                                    href={userData?.githublink}
                                    icon={<GithubFilled className="socialIconItem" />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col span={20}>
                <TeacherProfileForm data={userData} edit />
            </Col>
        </Row>
    );
}

export default EditTeacherProfile;
