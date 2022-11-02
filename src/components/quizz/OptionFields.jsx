/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Form, Input, Select } from 'antd';
import React from 'react';

const { Option } = Select;

const mcqOption = [1, 2, 3, 4];

function OptionFields({ field }) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0 10px',
                width: '79vw',
            }}
        >
            {mcqOption.map((v) => (
                <Form.Item
                    key={`${Date.now()}${Math.random()}`}
                    {...field}
                    label={`option ${v}`}
                    name={[field.name, `option${v}`]}
                    rules={[
                        {
                            required: true,
                            message: 'Missing Option Text',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ))}
        </div>
    );
}

export default OptionFields;
