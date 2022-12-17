/* eslint-disable  */
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Select,
    Switch
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import CourseDropDown from "../create-course/CourseDropDown";
import TaskTypeSelect from "../create-course/TaskTypeSelect";
import DateTimePick from "./DateTimePick";
import OnlyMCQ from "./OnlyMCQ";
import OnlyShort from "./OnlyShort";

const { Option } = Select;

const SingleQuizzQuestion = () => {
    const [form] = Form.useForm();
    const [disableForm, setDisableForm] = useState(true);
    const [isCourse,setIsCourse] = useState(false);
    const [isTask,setIsTask] = useState(false);
    // setDisableForm(!((!disableForm)&(!taskType)));
    const [courseUid, setCourseUid] = useState("");
    const onFinish = (values) => {
        // console.log(JSON.stringify(values))
        // console.log("Received values of form:", values);
        // console.log(values.mcq)

        const dbTaskType = (isTask ==='quiz') ? 'quiz' : 'assignment';

        values.mcq = values.mcq ? values.mcq : [];
        values.short = values.short ? values.short : [];
        values.publish_result = values.publish_result === true;
        if (values.mcq.length + values.short.length == 0 && (isTask=='quiz')) {
            message.error(`Can't create a Task without any Question!`);
            return false;
        }

        const data = new FormData();
        data.append("taskid", Math.random().toString(36).slice(2));
        data.append("task_title", values.task_title);
        data.append("courseid", courseUid);
        data.append("time_start", values.time_start);
        data.append("time_end", values.time_end);
        //quiz related
        data.append("mcq", JSON.stringify(values.mcq));
        data.append("short", JSON.stringify(values.short));
        //quiz related end
        data.append("marks", values.marks);
        data.append("task_type", dbTaskType);
        // data.append("task_type", "quiz");
        data.append("publish_result", values.publish_result);
        const config = {
            method: "post",
            url: "http://localhost:3003/api/task",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data,
        };

        //   console.log(Object.entries(dd))
        //   console.log(values.task_title,values.courseid,values.time_start,values.time_end)
        axios(config)
            .then(function (response) {
                // form.resetFields();
                message.success("Task Created!");
                form.resetFields();
                // console.log('sent');
            })
            .catch(function (error) {
                message.error(`Failed to create the task.`);
                console.log(error);
            });
    };
    const onSelectCourse = (v) => {
        setIsCourse(true);
        setCourseUid(v);
        if(isTask){
            setDisableForm(false);
        }
    };
    const onSelectTask = (v) => {
        setIsTask(v);
        if(isCourse){
            setDisableForm(false);
        }
    };
    const handleChange = () => {
        form.setFieldsValue({
            sights: [],
        });
    };

    return (
        <>
            <div>
                <span>Course :  </span>
                <CourseDropDown detectSelect={onSelectCourse} />
                <TaskTypeSelect detectSelect={onSelectTask} />
            </div>
            <Form
                form={form}
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                autoComplete="off"
                disabled={disableForm}
            >
                <Form.Item
                    name="task_title"
                    label="Task Title"
                    style={
                        {
                            width: "70%",
                            marginTop:"8px"
                        }
                    }
                    rules={[
                        {
                            required: true,
                            message: "Missing area",
                        },
                    ]}
                >
                    <Input placeholder="Enter Quizz Title" />
                </Form.Item>
                <DateTimePick />
                <Form.Item
                    name="publish_result"
                    label="Publish Result Immedietly: "
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                </Form.Item>

                <Form.Item
                    name="marks"
                    label="Marks per question: "
                    initialValue={1}
                >
                    <InputNumber min={1} />
                </Form.Item>
                {isTask=='quiz' && <OnlyMCQ />}
                {isTask=='quiz' && <OnlyShort />}
                
                <Form.Item
                    style={{
                        marginLeft: "25%",
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: "50%",
                        }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SingleQuizzQuestion;
