/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';
import OptionFields from './OptionFields';

const { Option } = Select;

const mcqOption = [1, 2, 3, 4];
const children = [];
for (let i = 1; i < 5; i++) {
    children.push(<Option key={i.toString(36) + i} value={i}>{`Option${i}`}</Option>);
}
function OnlyMCQ() {
    const handleAnser = (value: string[]) => {
        // console.log(`selected ${value}`);
    };

    return (
        <Form.List name="mcq" key={Math.random()}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field, idx) => (
                        <Space key={Math.random()} align="baseline" direction="vertical">
                            <Space>
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, curValues) =>
                                        prevValues.area !== curValues.area ||
                                        prevValues.sights !== curValues.sights
                                    }
                                >
                                    {() => (
                                        <Form.Item
                                            key={Math.random()}
                                            {...field}
                                            style={{
                                                width: '80vw',
                                            }}
                                            label={`Question ${idx + 1}`}
                                            name={[field.name, 'question']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing Questoin Text',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                            <Form.Item key={Math.random()}>
                                <OptionFields field={field} />
                            </Form.Item>
                            <Form.Item
                                label="Select Correct Answer"
                                name={[field.name, 'ans']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Missing Answer',
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '400px' }}
                                    placeholder="Please select Correct Answer"
                                    onChange={handleAnser}
                                >
                                    {children}
                                </Select>
                            </Form.Item>
                        </Space>
                    ))}

                    <Form.Item
                        wrapperCol={{
                            span: 8,
                        }}
                    >
                        <Button
                            type="default"
                            danger
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            style={{
                                width: '100%',
                            }}
                        >
                            Add MCQ
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
}

export default OnlyMCQ;
