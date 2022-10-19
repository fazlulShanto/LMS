/* eslint-disable no-unused-vars */
import '../../app.css';
import AdminDashboard from '../../components/Dashboard/AdminDashboard';
import StudentDashboard from '../../components/Dashboard/StudentDashboard';
import TeacherDashboard from '../../components/Dashboard/TeacherDashboard';

import useAuth from '../../Hooks/useAuth';

function Dashboard() {
    const { userUuid, userRole } = useAuth();
    let objRole = JSON.parse(userRole);
    objRole = Object.keys(objRole);

    if (objRole.includes('Teacher')) {
        return <TeacherDashboard />;
    }
    if (objRole.includes('Student')) {
        return <StudentDashboard />;
    }
    return <AdminDashboard />;
}

export default Dashboard;
