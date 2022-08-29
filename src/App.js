/* eslint-disable  */
/* eslint-disable prettier/prettier */
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Tooltip } from 'antd';
import 'antd/dist/antd.min.css';
import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/DashBoard/Dashboard';
import ProfilePage from './pages/profile/ProfilePage';
import SettingsPage from './pages/settings/SettingsPage';

const { Content, Sider } = Layout;

function Page1() {
    return <h4> Page 2</h4>;
}

function Page2() {
    return <div>
        <ProfilePage />
        <h1>hello</h1>
    </div>;
}

function App() {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const navigate = useNavigate();
    const selectedKey = useLocation().pathname;

    const highlight = () => {
        if (selectedKey === '/') {
            return ['1'];
        }
        if (selectedKey === '/profile') {
            return ['2'];
        }
    };

    return (
        <Layout className="site-layout">
            <Sider trigger={null} collapsible collapsed={false}>
                <div className="logo">
                    <Tooltip placement="right" arrowPointAtCenter title="Expand / Shrink Menu">
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggleCollapsed,
                        })}
                    </Tooltip>
                </div>
                <Menu
                    mode="inline"
                    theme="light"
                    defaultSelectedKeys={['1']}
                    selectedKeys={highlight()}
                    style={{ height: '100%', borderRight: 0 }}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Link 1',
                            onClick: () => {
                                navigate('/');
                            },
                        },
                        {
                            key: '2',
                            icon: <TeamOutlined />,
                            label: 'Link 2',
                            onClick: () => {
                                navigate('/profile');
                            },
                        },
                        {
                            key: '3',
                            icon: <TeamOutlined />,
                            label: 'settings',
                            onClick: () => {
                                navigate('/settings');
                            },
                        },
                        {
                            key: '4',
                            icon: <TeamOutlined />,
                            label: 'DashBoard',
                            onClick: () => {
                                navigate('/dash');
                            },
                        },
                    ]}
                />
            </Sider>
            <Content>
                <Routes>
                    <Route exact path="/" element={<Page1 />} />
                    <Route path="/profile" element={<ProfilePage /> } />
                    <Route path="/settings" element={<SettingsPage /> } />
                    <Route path="/dash" element={<Dashboard /> } />
                </Routes>
            </Content>
        </Layout>
    );
}

export default App;
