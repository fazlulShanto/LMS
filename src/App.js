/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import './app.css';
import Loginform from './components/login-form/Loginform';
import MyCourses from './pages/courses/MyCourses';
import Dashboard from './pages/DashBoard/Dashboard';
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
            </Routes>
        </div>
    );
}

export default App;
