import { LockFilled, TeamOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../default-layout/StudentLayout';

const iconStyle = {
    marginRight: '8px',
};
function StudentSettings() {
    // const { userRole } = useAuth();
    // const roleObj = Object.keys(JSON.parse(userRole));
    return (
        <StudentLayout>
            <div className="settings-button-div ">
                <Button className="click-btn" icon={<TeamOutlined style={iconStyle} />}>
                    <Link to="/edit-profile">Edit Profile</Link>
                </Button>
                <Button className="click-btn" icon={<LockFilled style={iconStyle} />}>
                    <Link to="/reset-password">Change Password</Link>
                </Button>
            </div>
        </StudentLayout>
    );
}

export default StudentSettings;
