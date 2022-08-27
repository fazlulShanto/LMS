import { AppstoreAddOutlined } from '@ant-design/icons';
import React from 'react';
import './coursestats.css';
import Percentagecontent from './Percentagecontent';

export default function Coursestats() {
    return (
        <div className="course-stats-container">
            <div className="course-new-task">
                <AppstoreAddOutlined style={{ fontSize: '22px', color: 'blue' }} />
                <span className="new-task-icon-text">Create New Task</span>
            </div>
            <Percentagecontent text="this is course" number={45} />
            <Percentagecontent text="Total Student" number={65} />
            <Percentagecontent text="Pass Rate" number={95} />
        </div>
    );
}
