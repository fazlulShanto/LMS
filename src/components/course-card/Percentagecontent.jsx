import React from 'react';
import './Percentagecontent.css';

export default function Percentagecontent({ text, number }) {
    return (
        <div className="course-stats-percentage">
            <div className="percentage-text">{text}</div>
            <div className="percentage-number"> {number}% </div>
        </div>
    );
}
