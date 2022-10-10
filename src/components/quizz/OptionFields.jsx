/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Form, Input, Select, Space } from 'antd';
import React from 'react';

const { Option } = Select;

const mcqOption = [1, 2, 3, 4];

function OptionFields({ field }) {
    return (
        <Space>
            {mcqOption.map((v) => (
                <Form.Item
                    key={`${Date.now()}${Math.random()}`}
                    {...field}
                    style={{
                        width: '24vw',
                    }}
                    label={`option${v}`}
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
        </Space>
    );
}

export default OptionFields;
