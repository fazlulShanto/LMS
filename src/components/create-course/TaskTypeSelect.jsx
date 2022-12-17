/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Select } from 'antd';
import './dropDown.css';

import React from 'react';

const { Option } = Select;

function TaskTypeSelect({ detectSelect }) {
    const handleChange = (value) => {
        if (detectSelect) {
            detectSelect(value);
        }
    };

    return (
        <Select
            placeholder="Select Task Type"
            style={{
                width: 150,
            }}
            onChange={handleChange}
            options={[
                {
                    value: 'quiz',
                    label: 'Quiz',
                },
                {
                    value: 'assignment',
                    label: 'Assignment',
                },
            ]}
        />
    );
}

export default TaskTypeSelect;
