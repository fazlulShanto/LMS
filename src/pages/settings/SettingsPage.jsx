import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../components/DefaultLayout';

export default function SettingsPage() {
    return (
        <DefaultLayout>
            <Button>
                <Link to="/profile">Edit Profile</Link>
            </Button>
        </DefaultLayout>
    );
}
