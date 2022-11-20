/* eslint-disable no-unused-vars */
import { FacebookFilled, GithubFilled } from '@ant-design/icons';
import React from 'react';
import UploadImage from './UploadImage';

function ProfileCard({ edit, id, student }) {
    return (
        <div className="profileCardContainer">
            <div className="profile_photo_div">
                <img
                    src={`http://localhost:3003/users/${id}.png`}
                    alt=""
                    className="profile_photo"
                />
                {edit && (
                    <div className="upload-icon-div">
                        <UploadImage userid={id} />
                    </div>
                )}
            </div>

            <div className="profileStatsDiv">
                <div className="test1">User Name</div>
                <div className="test1">Id : 17000</div>
                <div className="test1">phone Number</div>
                <div>
                    <h4 className="test1">Social Networks</h4>
                    <div className="socialIconDiv">
                        <FacebookFilled className="socialIconItem" />
                        <GithubFilled className="socialIconItem" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
