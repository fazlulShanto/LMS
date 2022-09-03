import { FacebookFilled, GithubFilled } from '@ant-design/icons';
import React from 'react';
import png from '../lms-logo.png';

function ProfileCard() {
    return (
        <div className="profileCardContainer">
            <div className="profile_photo_div">
                <img src={png} alt="" className="profile_photo" />
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
