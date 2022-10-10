/* eslint-disable  */
import { Button, Form, Input, InputNumber, message, Select, Switch } from "antd";
import axios from "axios";
import React from "react";
import DateTimePick from "./DateTimePick";
import OnlyMCQ from "./OnlyMCQ";
import OnlyShort from "./OnlyShort";
const { Option } = Select;
const courselist = [
    {
        label: "Cse101",
        value: "cse101",
    },
    {
        label: "Cse102",
        value: "cse102",
    },
];

const SingleQuizzQuestion = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        // console.log(JSON.stringify(values))
        // console.log("Received values of form:", values);
        // console.log(values.mcq)
       

        values.mcq = (values.mcq ?  values.mcq : [] );
        values.short =   (values.short ? values.short  :  []);
        values.publish_result = values.publish_result ===  true ;
        if(values.mcq.length + values.short.length == 0){
            message.error(`Can't create a Task without any Question!`);
            return false;
        }


        const data = new FormData();
          data.append("taskid",Math.random().toString(36).slice(2));
          data.append("task_title" ,values.task_title);
          data.append( "courseid", "course12",)
          data.append("time_start",values.time_start)
          data.append("time_end",values.time_end)
          data.append("mcq",JSON.stringify(values.mcq))
          data.append("short",JSON.stringify(values.short));
          data.append("marks",values.marks);
          data.append("task_type","quiz");
          data.append('publish_result',values.publish_result);
          const config = {
              method: 'post',
              url: 'http://localhost:3003/api/task',
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              data: data,
          };

        //   console.log(Object.entries(dd))
        //   console.log(values.task_title,values.courseid,values.time_start,values.time_end)
          axios(config)
          .then(function (response) {
            // form.resetFields();
            message.success('Task Created!')
            // console.log('sent');
          })
          .catch(function (error) {
            message.error(`Failed to create the task.`)
            console.log(error);
          });

          
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
            // style={{
            //     width: "90vw",
            // }}
        >
            <Form.Item
                name="courseid"
                label="Course"
                // initialValue={"Cse101"}
                wrapperCol={{
                  offset:0,
                  span: 8,
                }}
                rules={[
                    {
                        required: true,
                        message: "Missing area",
                    },
                ]}
            >
                <Select options={courselist} onChange={handleChange} />
            </Form.Item>
            
            <Form.Item
                name="task_title"
                label="Task Title"
                style={{
                  
                  width: '70vw',
              }}
                rules={[
                    {
                        required: true,
                        message: "Missing area",
                    },
                ]}
            >
                <Input   placeholder="Enter Quizz Title"/>
            </Form.Item>
            <DateTimePick />
            <Form.Item
                name = 'publish_result'
                label = "Publish Result Immedietly: "
                valuePropName="checked"  
            >
                <Switch checkedChildren="Yes" unCheckedChildren="No"/>
            </Form.Item>
            <Form.Item
                name = 'marks'
                label = "Marks per question: "
                initialValue={1}
                 
            >
                <InputNumber min={1}   />
            </Form.Item>
            <OnlyMCQ />
            <OnlyShort />
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        width: "90vw",
                    }}
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SingleQuizzQuestion;
