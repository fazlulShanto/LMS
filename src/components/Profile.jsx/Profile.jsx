import { Col, Row } from 'antd';
import React from 'react';

import './profile.css';
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';

export default function Profile() {
    return (
        <Row>
            <Col span={4}>
                <ProfileCard />
            </Col>
            <Col span={20}>
                <ProfileForm />
            </Col>
        </Row>
    );
}
