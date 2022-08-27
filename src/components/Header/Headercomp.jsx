import { BellTwoTone, UserOutlined } from '@ant-design/icons';
import React from 'react';
import Icontext from '../icon-text/Icontext';
import './headercomp.css';

export default function Headercomp({ pageName = 'Dashboard' }) {
    return (
        <div className="header-container">
            <div className="page-name">{pageName}</div>
            <div className="nabdiv">
                <BellTwoTone style={{ fontSize: '24px', marginRight: '8px', cursor: 'pointer' }} />
                <Icontext icon={<UserOutlined />} text="User" />
            </div>
        </div>
    );
}
