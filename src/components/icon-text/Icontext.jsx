import React from 'react';
import './icontext.css';

// eslint-disable-next-line no-unused-vars
export default function Icontext({ icon, text }) {
    return (
        <div className="icontext-contianer">
            <div className="icon-part">{icon}</div>
            <div className="text-part">{text}</div>
        </div>
    );
}
