import React from 'react';
import StudentSettings from '../../components/settings-comp/StudentSettings';
import TeacherSettings from '../../components/settings-comp/TeacherSettings';
import useAuth from '../../Hooks/useAuth';

export default function SettingsPage() {
    const { userRole } = useAuth();
    const roleObj = Object.keys(JSON.parse(userRole));
    if (roleObj.includes('Teacher')) {
        return <TeacherSettings />;
    }
    if (roleObj.includes('Student')) {
        return <StudentSettings />;
    }
}
