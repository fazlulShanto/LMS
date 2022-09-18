/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import './app.css';
import AddLesson from './components/create-course/AddLesson';
import CreateCourse from './components/create-course/CreateCourse';
import NewLesson from './components/create-course/NewLesson';
import Loginform from './components/login-form/Loginform';
import Course from './components/Single-Course/Course';
import User from './components/users/User';
import MyCourses from './pages/courses/MyCourses';
import Dashboard from './pages/DashBoard/Dashboard';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import MessengerPage from './pages/Messenger/MessengerPage';
import ProfilePage from './pages/profile/ProfilePage';
import SchedulePage from './pages/schedule/SchedulePage';
import SettingsPage from './pages/settings/SettingsPage';
import Signup from './pages/Signup/Signup';

const auth = true;
function temp() {
    return <h1>Hello world</h1>;
}

function App() {
    const paged = () => (auth ? <Dashboard /> : <Loginform />);
    // const pageNo = 1;
    // let renderPage = <Dashboard />;
    // if (pageNo === 2) {
    //     renderPage = <Loginform />;
    // }
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={paged()} />
                <Route path="/dash" element={<Dashboard />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/chat" element={<MessengerPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/mycourses" element={<MyCourses />} />

                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Loginform />} />
                <Route path="/forgotpass" element={<ForgotPassword />} />
                <Route path="user/:id" element={<User />} />
                <Route path="course/:id" element={<Course />} />
                <Route path="course" element={<Course />} />
                <Route path="create" element={<CreateCourse />} />
                <Route path="add" element={<AddLesson />} />
                <Route path="new" element={<NewLesson />} />
            </Routes>
        </div>
    );
}

export default App;
