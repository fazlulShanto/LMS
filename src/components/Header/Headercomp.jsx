import { BellTwoTone, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Icontext from '../icon-text/Icontext';
import './headercomp.css';

export default function Headercomp({ pageName = 'Dashboard' }) {
    const { userName } = useAuth();
    const navi = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user_uuid');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('roles');
        localStorage.removeItem('userName');
        // message.success('get out');
        navi('/login');
    };
    return (
        <div className="header-container">
            <div className="page-name">{pageName}</div>
            <div className="nabdiv">
                <BellTwoTone style={{ fontSize: '24px', marginRight: '8px', cursor: 'pointer' }} />
                <Icontext icon={<UserOutlined />} text={userName} />
                <LogoutOutlined
                    rotate={-90}
                    style={{
                        fontSize: '24px',
                        marginLeft: '8px',
                        cursor: 'pointer',
                        color: 'red',
                    }}
                    title="Log Out"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
}
