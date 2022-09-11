import { Form, Input } from 'antd';
import React from 'react';

function SingleFormField({ label, name, msg, required }) {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                {
                    required,
                    message: msg,
                },
            ]}
        >
            <Input />
        </Form.Item>
    );
}

export default SingleFormField;
