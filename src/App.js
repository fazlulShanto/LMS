/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import AddLesson from './components/create-course/AddLesson';
import CreateCourse from './components/create-course/CreateCourse';
import NewLesson from './components/create-course/NewLesson';
import EnrollCourse from './components/enroll/EnrollCourse';
import Loginform from './components/login-form/Loginform';
import SingleQuizzQuestion from './components/quizz/SingleQuizzQuestion';
import TeacherViewQuiz from './components/quizz/TeacherViewQuiz';
import ViewQuiz from './components/quizz/ViewQuiz';
import RequireAuth from './components/req-auth/RequireAuth';
import UserNotApproved from './components/signup-form/UserNotApproved';
import Course from './components/Single-Course/Course';
import UnAuthrorized from './components/unauthorized/UnAuthrorized';
import User from './components/users/User';
import AuthContext from './Context/AuthContext';
import AdminChat from './pages/admin/AdminChat';

import AdminListStudents from './pages/admin/AdminListStudents';
import AdminListTeacher from './pages/admin/AdminListTeacher';
import AdminSettings from './pages/admin/AdminSettings';
import PendingApproval from './pages/admin/PendingApproval';
import MyCourses from './pages/courses/MyCourses';
import Dashboard from './pages/DashBoard/Dashboard';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import MessengerPage from './pages/Messenger/MessengerPage';
import EditProfilePage from './pages/profile/EditProfilePage';
import ViewProfilePage from './pages/profile/ViewProfilePage';
import ResetPasswordPage from './pages/Reset-password/ResetPasswordPage';
import SchedulePage from './pages/schedule/SchedulePage';
import SettingsPage from './pages/settings/SettingsPage';
import Signup from './pages/Signup/Signup';

function temp() {
    return <h1>Hello world</h1>;
}
function App() {
    const { loggedIn } = useContext(AuthContext);
    return (
        <div className="app">
            <Routes>
                {/* Public Route without having auth */}
                <Route>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Loginform />} />
                    <Route path="/forgotpass" element={<ForgotPassword />} />
                    <Route path="/unauthorized" element={<UnAuthrorized />} />
                    <Route path="/wait" element={<UserNotApproved />} />
                </Route>
                {/* <Route path="/" element={paged()} /> */}

                {/* <Route element={<RequireAuth allowedRoles={['Admin']} />}> */}
                <Route element={<RequireAuth allowedRoles={['Admin']} />}>
                    {/* {Admin only Routes} */}
                    {/* <Route path="/" element={<AdminListStudents />} /> */}
                    {/* <Route path="/admin" element={<AdminLayout />} /> */}
                    <Route path="/admin-list-students" element={<AdminListStudents />} />
                    <Route path="/admin-list-teacher" element={<AdminListTeacher />} />
                    <Route path="/pending-approval" element={<PendingApproval />} />
                    <Route path="/admin-settings" element={<AdminSettings />} />
                    <Route path="/admin-chat" element={<AdminChat />} />
                </Route>
                {/* Teacher Only Routes */}
                <Route element={<RequireAuth allowedRoles={['Teacher']} />}>
                    {/* <Route path="/dash" element={<Dashboard />} /> */}
                    {/* <Route path="/settings" element={<SettingsPage />} /> */}
                </Route>
                {/* Student Only Route */}
                <Route element={<RequireAuth allowedRoles={['Student']} />}>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    {/* <Route path="/dash" element={<Dashboard />} /> */}
                    <Route path="/enroll" element={<EnrollCourse />} />
                    {/* <Route path="/settings" element={<SettingsPage />} /> */}
                </Route>
                {/* Teacher | Student | Admin Route */}
                <Route element={<RequireAuth allowedRoles={['Teacher', 'Student', 'Admin']} />}>
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dash" element={<Dashboard />} />
                    <Route path="/chat" element={<MessengerPage />} />
                    <Route path="/schedule" element={<SchedulePage />} />
                    <Route path="/mycourses" element={<MyCourses />} />

                    <Route path="/profile/:id" element={<ViewProfilePage />} />
                    <Route path="/edit-profile" element={<EditProfilePage />} />
                    <Route path="user/:id" element={<User />} />
                    <Route path="course/:id" element={<Course />} />
                    <Route path="course" element={<Course />} />
                    <Route path="create" element={<CreateCourse />} />
                    <Route path="add" element={<AddLesson />} />
                    <Route path="new" element={<NewLesson />} />
                    <Route path="quiz" element={<SingleQuizzQuestion />} />
                    <Route path="vqt/:id" element={<TeacherViewQuiz />} />
                    <Route path="view-quiz/:id" element={<ViewQuiz />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
