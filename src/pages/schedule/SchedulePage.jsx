import React from 'react';
import DefaultLayout from '../../components/default-layout/DefaultLayout';
import StudentLayout from '../../components/default-layout/StudentLayout';
import StudentSchedule from '../../components/schedule-comp/StudentSchedule';
import TeacherSchedule from '../../components/schedule-comp/TeacherSchedule';
import useAuth from '../../Hooks/useAuth';
import AdminLayout from '../admin/AdminLayout';

export default function SchedulePage() {
    const { userRole, userUuid } = useAuth();
    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return (
            <DefaultLayout>
                <TeacherSchedule id={userUuid} />
            </DefaultLayout>
        );
    }
    if (roleObj.includes('Student')) {
        return (
            <StudentLayout>
                <StudentSchedule id={userUuid} />
            </StudentLayout>
        );
    }
    return (
        <AdminLayout>
            <h1>Schedule page</h1>
        </AdminLayout>
    );
}
