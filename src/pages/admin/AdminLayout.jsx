/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */

import {
    DashboardFilled,
    MessageTwoTone,
    // TeamOutlined,
    // eslint-disable-next-line prettier/prettier
    ScheduleFilled, SettingFilled, SketchSquareFilled
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headercomp from '../../components/Header/Headercomp';
// import '../resources/layout.css';

import logo from '../../components/lms-logo.png';

// eslint-disable-next-line no-unused-vars
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, onClick) {
    return {
        key,
        icon,
        onClick,
        label,
    };
}

// getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),

// eslint-disable-next-line no-unused-vars
function IconDiv() {
    // const src = `./../resources/lms-logo.png`;

    return (
        <div className="logo-container">
            <img src={logo} alt="LMS-logo" className="lgo" />
            <h3 className="lgo-title">LMS </h3>
        </div>
    );
}
const pages = [
    'Admin Dashboard',
    'Student',
    'Teacher',
    'Messages',
    'Pending Approvals',
    'Settings',
];
function AdminLayout(props) {
    // eslint-disable-next-line no-unused-vars
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const selectedKey = useLocation().pathname;
    const highlight = () => {
        if (selectedKey === '/' || selectedKey === '/admin') {
            return [null];
        }
        if (selectedKey === '/admin-list-students') {
            return ['1'];
        }
        if (selectedKey === '/admin-list-teacher') {
            return ['2'];
        }

        if (selectedKey === '/admin-chat') {
            return ['3'];
        }
        if (selectedKey === '/pending-approval') {
            return ['4'];
        }
        if (selectedKey === '/admin-settings') {
            return ['5'];
        }
        return [null];
    };
    const items = [
        getItem('Students', '1', <DashboardFilled />, () => {
            navigate('/admin-list-students');
        }),
        getItem('Teachers', '2', <SketchSquareFilled />, () => {
            navigate('/admin-list-teacher');
        }),
        getItem('Messages', '3', <MessageTwoTone />, () => {
            navigate('/admin-chat');
        }),
        getItem('Pending Approvals', '4', <ScheduleFilled />, () => {
            navigate('/pending-approval');
        }),
        getItem('Settings', '5', <SettingFilled />, () => {
            navigate('/admin-settings');
        }),
    ];

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                    left: 0,
                }}
                // collapsible
                // collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="logo">
                    <IconDiv />
                </div>
                <Menu
                    theme="dark"
                    className="menu-container"
                    defaultSelectedKeys={['1']}
                    selectedKeys={highlight()}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        margin: '0 16px 8px 16px',
                        // backgroundColor: '#122033',
                    }}
                >
                    {console.log()}
                    <Headercomp pageName={pages[parseInt(highlight().shift(), 10)]} />
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {/* <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        {props.children}
                    </div>
                </Content>

                {/* <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2018 Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
