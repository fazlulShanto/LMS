/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockFilled, TeamOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const iconStyle = {
    marginRight: '8px',
};
function AdminSettings() {
    return (
        <AdminLayout>
            <div className="settings-button-div ">
                <Button className="click-btn" icon={<TeamOutlined style={iconStyle} />}>
                    <Link to="/edit-profile">Edit Profile</Link>
                </Button>
                <Button className="click-btn" icon={<LockFilled style={iconStyle} />}>
                    <Link to="/reset-password">Change Password</Link>
                </Button>
            </div>
        </AdminLayout>
    );
}

export default AdminSettings;
