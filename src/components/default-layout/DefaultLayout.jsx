/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
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
import React, { useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import '../../resources/layout.css';
import Headercomp from '../Header/Headercomp';
import logo from '../lms-logo.png';
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

// eslint-disable-next-line no-unused-vars
function IconDiv() {
    return (
        <div className="logo-container">
            <img src={logo} alt="LMS-logo" className="lgo" />
            <h3 className="lgo-title">LMS </h3>
        </div>
    );
}

const pages = [
    {
        label: 'Dashboard',
        icon: <DashboardFilled />,
        linkto: 'dash',
    },
    // {
    //     label: 'View Courses',
    //     icon: <SketchSquareFilled />,
    //     linkto: 'teacher-course-list',
    // },
    {
        label: 'Manage Courses',
        icon: <SketchSquareFilled />,
        linkto: 'mycourses',
    },
    {
        label: 'Messages',
        icon: <MessageTwoTone />,
        linkto: 'chat',
    },
    {
        label: 'Schedule',
        icon: <ScheduleFilled />,
        linkto: 'schedule',
    },
    {
        label: 'Settings',
        icon: <SettingFilled />,
        linkto: 'settings',
    },
];

function DefaultLayout(props) {
    // eslint-disable-next-line no-unused-vars
    const hdref = useRef(null);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const selectedKey = useLocation().pathname;
    const highlight = () => {
        const findRes = pages.findIndex((v) => {
            if (selectedKey == '/') return ['0'];
            const modi = `/${v.linkto}`;
            return modi == selectedKey;
        });
        if (findRes != -1) {
            return pages[`${findRes}`];
        }
        if (selectedKey.includes('course/')) {
            return { label: `Class Code: ${selectedKey.split('/').pop()}` };
        }
        if (selectedKey.includes('edit-profile')) {
            console.log('here');
            return { label: `profile` };
        }
        return [null];
    };
    const MenuItems = pages.map((singleItem, idx) =>
        getItem(singleItem.label, `${idx}`, singleItem.icon, () => {
            navigate(`/${singleItem.linkto}`);
        })
    );
    // console.log(MenuItems);

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
                    items={MenuItems}
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
                    {console.log(highlight())}
                    <Headercomp pageName={highlight()?.label || ' '} />
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
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
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;
