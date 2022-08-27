/* eslint-disable no-unused-vars */
import React from 'react';
import './activeday.css';

// eslint-disable-next-line prettier/prettier
export default function Activeday({ days=[] }) {
    const maxDay = 5;
    const weekDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed'];

    const finalDays = weekDays.map((v, i) => {
        if (days.includes(i + 1)) {
            return (
                <span className="day-name active" key={v}>
                    {v}
                </span>
            );
        }
        return (
            <span className="day-name" key={v}>
                {v}
            </span>
        );
    });

    return finalDays;
}
