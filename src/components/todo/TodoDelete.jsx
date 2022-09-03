/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function TodoDelete({ id }) {
    return (
        <div className="todoX" id={id}>
            X
        </div>
    );
}

export default TodoDelete;
