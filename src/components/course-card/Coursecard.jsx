import React from 'react';
import Activeday from '../active-day/Activeday';
import './coursecard.css';
import Coursestats from './Coursestats';
import Coursetask from './Coursetask';

export default function Coursecard({ days, tasks, lastUpdate }) {
    return (
        <div className="course-card-container">
            <div className="course-info-section">
                <h2>Course Code : Course Name</h2>
                <h4>Course Teacher Name</h4>
                <Activeday days={days} />
                <Coursetask courseTaskSchedule={tasks} lastUpdate={lastUpdate} />
            </div>
            <div className="course-stats-section">
                <Coursestats tasks={tasks} />
            </div>
        </div>
    );
}
