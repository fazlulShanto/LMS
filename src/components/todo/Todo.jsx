/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */

import React, { useState } from 'react';
import './todo.css';
import TodoInput from './TodoInput';
import TodoOutput from './TodoOutput';

// eslint-disable-next-line no-unused-vars

export default function Todo({ userId }) {
    // eslint-disable-next-line no-unused-vars
    // console.log(userId);
    const [rr, setRR] = useState(true);
    const handleChange = () => {
        setRR(!rr);
    };

    return (
        <div className="todo">
            <div>
                <h3 style={{ textAlign: 'center' }}>Todo:</h3>
                <TodoOutput userId={userId} hotReload={rr} />
            </div>
            <div className="input-todo">
                <TodoInput userId={userId} forceReload={handleChange} />
            </div>
        </div>
    );
}
