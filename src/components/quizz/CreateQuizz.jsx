/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';

const { Option } = Select;
const areas = [
    {
        label: 'Beijing',
        value: 'Beijing',
    },
    {
        label: 'Shanghai',
        value: 'Shanghai',
    },
];
const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
};

const questionType = ['MCQ', 'Short Answer'];

function CreateQuizz() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    const handleChange = () => {
        form.setFieldsValue({
            sights: [],
        });
    };

    return (
        <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.Item
                name="course"
                label="Select a course"
                rules={[
                    {
                        required: true,
                        message: 'Missing Course',
                    },
                ]}
            >
                <Select options={areas} onChange={handleChange} />
            </Form.Item>
            <Form.Item
                name="qizz_title"
                label="Quizz Title"
                rules={[
                    {
                        required: true,
                        message: 'Missing Title',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.List name="questions">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <Space key={Math.random()} align="baseline">
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, curValues) =>
                                        prevValues.course !== curValues.course
                                    }
                                >
                                    {() => (
                                        <Form.Item
                                            {...field}
                                            label="Question Type"
                                            name={[field.name, 'question_type']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing question',
                                                },
                                            ]}
                                        >
                                            <Select
                                                disabled={!form.getFieldValue('course')}
                                                style={{
                                                    width: 140,
                                                }}
                                            >
                                                {questionType.map((item) => (
                                                    <Option
                                                        key={`${item}${Math.random()}`}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="Question"
                                    name={[field.name, 'single_question']}
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Missing Question',
                                        },
                                    ]}
                                >
                                    {/* <SingleQuizzQuestion /> */}
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Question2"
                                    hidden={form.getFieldsValue('question_type')}
                                    name={[field.name, 'single_question2']}
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Missing Question',
                                        },
                                    ]}
                                >
                                    <Form.List name="mcq_Option">
                                        {(fields2) => (
                                            <>
                                                <div>
                                                    {fields2.map((field22) => (
                                                        <Form.Item {...field22} label="hi">
                                                            <Input />
                                                        </Form.Item>
                                                    ))}
                                                </div>
                                                <div>
                                                    <Button onClick={() => add()}>++++</Button>
                                                </div>
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Questions
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default CreateQuizz;
