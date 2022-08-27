import React from 'react';
import './todo.css';

// eslint-disable-next-line no-unused-vars
const todoItems = ['data 100', 'data 200', 'data 300', 'data 400'];

export default function Todo({ todoData = todoItems }) {
    return (
        <div className="todo">
            <h3 style={{ textAlign: 'center' }}>Todo:</h3>
            <ol>
                {todoData.map((v) => (
                    <li key={v}>{v}</li>
                ))}
            </ol>
        </div>
    );
}
