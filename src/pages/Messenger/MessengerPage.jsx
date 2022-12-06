import React from 'react';
import Chat from '../../components/chat-comp/Chat';

import DefaultLayout from '../../components/default-layout/DefaultLayout';
import StudentLayout from '../../components/default-layout/StudentLayout';
import useAuth from '../../Hooks/useAuth';
import AdminLayout from '../admin/AdminLayout';

export default function MessengerPage() {
    const { userUuid, userRole } = useAuth();
    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return (
            <DefaultLayout>
                <Chat sender={userUuid} />
            </DefaultLayout>
        );
    }
    if (roleObj.includes('Student')) {
        return (
            <StudentLayout>
                <Chat sender={userUuid} />
            </StudentLayout>
        );
    }
    return (
        <AdminLayout>
            <Chat sender={userUuid} />
        </AdminLayout>
    );
}
