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
import '../resources/layout.css';
import Headercomp from './Header/Headercomp';
import logo from './lms-logo.png';

// eslint-disable-next-line no-unused-vars
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Dashboard', '1', <DashboardFilled />),
    getItem('My Courses', '11', <SketchSquareFilled />),
    getItem('Messages', '2', <MessageTwoTone />),
    getItem('Schedule', '3', <ScheduleFilled />),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Settings', '4', <SettingFilled />),
];

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

function DefaultLayout(props) {
    const [collapsed, setCollapsed] = useState(false);
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
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="logo">
                    <IconDiv />
                </div>
                <Menu
                    theme="dark"
                    className="menu-container"
                    defaultSelectedKeys={['1']}
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
                    <Headercomp />
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
