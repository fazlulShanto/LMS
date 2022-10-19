import React from 'react';
import useAuth from '../../Hooks/useAuth';
import AdminLayout from '../../pages/admin/AdminLayout';
import Greetings from '../Greetings/Greetings';
import Todo from '../todo/Todo';

function AdminDashboard() {
    const { userUuid } = useAuth();
    return (
        <AdminLayout>
            <Greetings />
            <Todo userId={userUuid} />
        </AdminLayout>
    );
}

export default AdminDashboard;
