/* eslint-disable no-unused-vars */
import React from 'react';
import DefaultLayout from '../../components/default-layout/DefaultLayout';
import StudentLayout from '../../components/default-layout/StudentLayout';
import ResetPassword from '../../components/reset-password/ResetPassword';
import useAuth from '../../Hooks/useAuth';
import AdminLayout from '../admin/AdminLayout';

function ResetPasswordPage() {
    const { userUuid, userRole } = useAuth();

    let objRole = JSON.parse(userRole);
    objRole = Object.keys(objRole);

    if (objRole.includes('Teacher')) {
        return (
            <DefaultLayout>
                <ResetPassword id={userUuid} />
            </DefaultLayout>
        );
    }
    if (objRole.includes('Student')) {
        return (
            <StudentLayout>
                <ResetPassword id={userUuid} />
            </StudentLayout>
        );
    }
    return (
        <AdminLayout>
            <ResetPassword id={userUuid} />
        </AdminLayout>
    );
}

export default ResetPasswordPage;
