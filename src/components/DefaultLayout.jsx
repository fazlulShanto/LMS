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
import '../resources/layout.css';
import Headercomp from './Header/Headercomp';
import logo from './lms-logo.png';
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
const pages = ['Dashboard', 'My Courses', 'Messages', 'Schedule', 'Settings'];
function DefaultLayout(props) {
    // eslint-disable-next-line no-unused-vars
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const selectedKey = useLocation().pathname;
    const highlight = () => {
        if (selectedKey === '/' || selectedKey === '/dash') {
            return ['1'];
        }
        if (selectedKey === '/mycourses') {
            return ['2'];
        }
        if (selectedKey === '/chat') {
            return ['3'];
        }
        if (selectedKey === '/schedule') {
            return ['4'];
        }
        if (selectedKey === '/settings') {
            return ['5'];
        }
    };
    const items = [
        getItem('Dashboard', '1', <DashboardFilled />, () => {
            navigate('/dash');
        }),
        getItem('My Courses', '2', <SketchSquareFilled />, () => {
            navigate('/mycourses');
        }),
        getItem('Messages', '3', <MessageTwoTone />, () => {
            navigate('/chat');
        }),
        getItem('Schedule', '4', <ScheduleFilled />, () => {
            navigate('/schedule');
        }),
        getItem('Settings', '5', <SettingFilled />, () => {
            navigate('/settings');
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
                    <Headercomp pageName={pages[parseInt(highlight().shift() - 1, 10)]} />
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

export default DefaultLayout;
