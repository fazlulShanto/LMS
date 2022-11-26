/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import DefaultLayout from '../../components/default-layout/DefaultLayout';
import StudentLayout from '../../components/default-layout/StudentLayout';
import Profile from '../../components/Profile.jsx/Profile';
import useAuth from '../../Hooks/useAuth';
import AdminLayout from '../admin/AdminLayout';

export default function ProfilePage() {
    const { userRole } = useAuth();
    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return (
            <DefaultLayout>
                <Profile />
            </DefaultLayout>
        );
    }
    if (roleObj.includes('Student')) {
        return (
            <StudentLayout>
                <Profile />
            </StudentLayout>
        );
    }
    return (
        <AdminLayout>
            <Profile />
        </AdminLayout>
    );
}
