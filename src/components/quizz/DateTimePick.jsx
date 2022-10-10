/* eslint-disable react/jsx-props-no-spreading */
import { DatePicker, Form, Space } from 'antd';
import React from 'react';

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

function DateTimePick() {
    return (
        <Space align="center" size={100}>
            <Form.Item name="time_start" label="Set Starting Time:" {...config}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm a" />
            </Form.Item>
            <Form.Item name="time_end" label="Set Ending Time:" {...config}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm a" />
            </Form.Item>
        </Space>
    );
}

export default DateTimePick;
