import './app.css';
import Loginform from './components/login-form/Loginform';
import Dashboard from './pages/DashBoard/Dashboard';

function App() {
    const pageNo = 2;
    let renderPage = <Dashboard />;
    if (pageNo === 2) {
        renderPage = <Loginform />;
    }

    return (
        <div>
            {renderPage}
            {/* <Dashboard /> */}
            {/* <Signupform /> */}
            {/* <Loginform /> */}
        </div>
    );
}

export default App;
