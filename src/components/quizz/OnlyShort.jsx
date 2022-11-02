/* eslint-disable react/jsx-props-no-spreading */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';

// const { Option } = Select;
function OnlyShort() {
    return (
        <Form.List name="short">
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field, idx) => (
                        <Space key={field.key} align="baseline">
                            <Form.Item
                                {...field}
                                style={{
                                    width: '78vw',
                                }}
                                label={`Short Question ${idx + 1}`}
                                name={[field.name, 'shortq']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing Question Text',
                                    },
                                ]}
                            >
                                <Input.TextArea allowClear rows={1} />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </Space>
                    ))}

                    <Form.Item
                        wrapperCol={{
                            span: 8,
                        }}
                    >
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            danger
                            block
                            icon={<PlusOutlined />}
                        >
                            Add Short Question
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
}

export default OnlyShort;
