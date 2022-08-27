import { MergeCellsOutlined, ScheduleOutlined } from '@ant-design/icons';
import React from 'react';
import './coursetask.css';

export default function Coursetask({
    lastUpdate = new Date().toLocaleDateString(),
    courseTaskSchedule = '',
}) {
    return (
        <div className="course-task-info-div">
            <div>
                <ScheduleOutlined className="logo-Task" /> Tasks : {courseTaskSchedule}
            </div>
            <div>
                <MergeCellsOutlined className="logo-Task" /> Last Updated : {lastUpdate}
            </div>
        </div>
    );
}
