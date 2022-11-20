import React from 'react';
import DefaultLayout from '../../components/default-layout/DefaultLayout';
import StudentLayout from '../../components/default-layout/StudentLayout';
import ViewProfile from '../../components/Profile.jsx/ViewProfile';

import useAuth from '../../Hooks/useAuth';
import AdminLayout from '../admin/AdminLayout';

function ViewProfilePage() {
    const { userRole } = useAuth();
    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return (
            <DefaultLayout>
                <ViewProfile />
            </DefaultLayout>
        );
    }
    if (roleObj.includes('Student')) {
        return (
            <StudentLayout>
                <ViewProfile />
            </StudentLayout>
        );
    }
    return (
        <AdminLayout>
            <ViewProfile />
        </AdminLayout>
    );
}

export default ViewProfilePage;
