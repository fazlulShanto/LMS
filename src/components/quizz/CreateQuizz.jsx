/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;
const questionType = ['MCQ', 'Short Answer'];
const courseList = [
    {
        label: 'CSE01',
        value: 'CSE01',
    },
    {
        label: 'CSE02',
        value: 'CSE02',
    },
];
function CreateQuizz() {
    const [form] = Form.useForm();
    const [mcqType, setMcqType] = useState(null);
    const [formList, setFormList] = useState([]);

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };
    const handleNewItem = () => {
        const selecteMenu = (
            <Form.Item>
                <Select
                    style={{
                        width: 130,
                    }}
                    onSelect={(v) => {
                        console.log(v);
                    }}
                >
                    {questionType.map((v) => (
                        <Option key={v} value={v}>
                            {v}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        );
        setFormList([...formList, selecteMenu]);
        console.log(formList);
    };
    const handleChange = () => {
        form.setFieldsValue({
            sights: [],
        });
    };

    return (
        <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
            wrapperCol={{
                span: 16,
            }}
        >
            <Form.Item
                name="course"
                label="Select a course"
                initialValue="CSE02"
                rules={[
                    {
                        required: true,
                        message: 'Missing Course',
                    },
                ]}
            >
                <Select options={courseList} onChange={handleChange} />
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
            <Form.Item
                name="qizz_desc"
                label="Quizz Description"
                rules={[
                    {
                        required: true,
                        message: 'Missing Title',
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            {/*                 dynamic stuffs */}

            {/*                 dynamic stuffs end */}
            <Form.Item>
                <Button type="dashed" block onClick={handleNewItem} icon={<PlusOutlined />}>
                    Add Question
                </Button>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default CreateQuizz;
