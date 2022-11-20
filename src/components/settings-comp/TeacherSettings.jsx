import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../default-layout/DefaultLayout';

function TeacherSettings() {
    return (
        <DefaultLayout>
            <Button>
                <Link to="/edit-profile">Edit Profile</Link>
            </Button>
        </DefaultLayout>
    );
}

export default TeacherSettings;
