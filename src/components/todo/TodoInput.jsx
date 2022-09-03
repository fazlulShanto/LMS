/* eslint-disable no-unused-vars */

import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';

const todoApiUrl = `http://localhost:3003/api/todo/`;
function TodoInput({ userId, forceReload }) {
    const [form] = Form.useForm();
    const postTodo = (text) => {
        const config = {
            url: `${todoApiUrl}add/${userId}/?text=${text}`,
        };
        // console.log(config.url);
        axios
            .post(config.url)
            .then((response) => {
                // setTodoItem();
                // const dat = response.data.map((v) => v.text);
                // console.log(response);
                // setTodoItem(dat);
            })
            .catch((error) => {
                console.log(error);
            });

        // console.log('done');
    };
    const onFinish = (values: any) => {
        // console.log('Success:', values);
        postTodo(values.todo_text);
        forceReload();
        // eslint-disable-next-line no-param-reassign
        form.resetFields();

        // console.log(forceReload);
        // message.success('done');
    };

    // useEffect(() => {}, []);

    return (
        <Form
            form={form}
            layout="inline"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="todo-form"
            labelCol={{ span: 20, offset: 4 }}
        >
            <Form.Item
                name="todo_text"
                rules={[
                    {
                        required: true,
                        message: `A todo can't be empty!`,
                    },
                ]}
                wrapperCol={{ sm: 24 }}
                style={{ width: '80%', marginRight: 0 }}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    +
                </Button>
            </Form.Item>
        </Form>
    );
}

export default TodoInput;
