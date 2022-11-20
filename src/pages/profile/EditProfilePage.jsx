import React from 'react';
import DefaultLayout from '../../components/default-layout/DefaultLayout';
import StudentLayout from '../../components/default-layout/StudentLayout';
import EditStudentProfile from '../../components/Profile.jsx/EditStudentProfile';
import EditTeacherProfile from '../../components/Profile.jsx/EditTeacherProfile';
import useAuth from '../../Hooks/useAuth';
import AdminLayout from '../admin/AdminLayout';

export default function EditProfilePage() {
    const { userRole } = useAuth();
    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return (
            <DefaultLayout>
                <EditTeacherProfile />
            </DefaultLayout>
        );
    }
    if (roleObj.includes('Student')) {
        return (
            <StudentLayout>
                <EditStudentProfile student />
            </StudentLayout>
        );
    }
    return (
        <AdminLayout>
            <EditTeacherProfile />
        </AdminLayout>
    );
}
