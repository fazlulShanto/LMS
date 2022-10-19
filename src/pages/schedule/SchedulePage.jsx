import React from 'react';
import DefaultLayout from '../../components/default-layout/DefaultLayout';
import StudentLayout from '../../components/default-layout/StudentLayout';
import useAuth from '../../Hooks/useAuth';
import AdminLayout from '../admin/AdminLayout';

export default function SchedulePage() {
    const { userRole } = useAuth();
    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return (
            <DefaultLayout>
                <h1>chat page</h1>
            </DefaultLayout>
        );
    }
    if (roleObj.includes('Student')) {
        return (
            <StudentLayout>
                <h1>chat page</h1>
            </StudentLayout>
        );
    }
    return (
        <AdminLayout>
            <h1>chat page</h1>
        </AdminLayout>
    );
}
