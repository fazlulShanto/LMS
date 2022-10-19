import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../default-layout/StudentLayout';

function StudentSettings() {
    // const { userRole } = useAuth();
    // const roleObj = Object.keys(JSON.parse(userRole));
    return (
        <StudentLayout>
            <Button>
                <Link to="/profile">Edit Profile</Link>
            </Button>
        </StudentLayout>
    );
}

export default StudentSettings;
