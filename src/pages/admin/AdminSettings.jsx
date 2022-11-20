import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

function AdminSettings() {
    return (
        <AdminLayout>
            <Button>
                <Link to="/edit-profile">Edit Profile</Link>
            </Button>
        </AdminLayout>
    );
}

export default AdminSettings;
