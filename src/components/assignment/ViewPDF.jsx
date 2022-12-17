/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { Button, InputNumber, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import React, { useState } from 'react';

function ViewPDF({ handleOk, handleCancel, data }) {
    const [totalMarks, setTotalMarks] = useState(data.marks);
    const [teacherMarks, setTeacherMarks] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form] = useForm();
    console.log(data);
    const testLink = `http://localhost:3003/tasks/${data.response.filepath}`;
    const onFinish = (values) => {
        // const pd = form.getFieldsValue();
        // console.log(pd);
        // console.log('Success:', values);
        // handleOk();
        const mydata = JSON.stringify({
            taskid: data.taskid,
            studentid: data.user_uuid,
            marks: teacherMarks,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/task/marks',
            headers: {
                'Content-Type': 'application/json',
            },
            data: mydata,
        };

        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                handleOk();
                message.success(`Done!`, 0.6);
            })
            .catch((error) => {
                console.log(error);
                message.error(`Failed!`, 0.5);
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (value) => {
        // console.log('changed', value);
        setTeacherMarks(value);
    };
    const handleMarks = (ev) => {
        const test = Number(ev) || 0;
        const mcqMarks = data.response.correct.length;
        const vd = Object.values(form.getFieldsValue())
            .map((v) => {
                const temp = Number(v) > 0 ? Number(v) : 0;
                return temp;
            })
            .reduce((prev, nxt) => prev + nxt, mcqMarks);

        setTotalMarks(vd);
    };
    return (
        <Modal
            title={`${data.student_id} :${data.name}`}
            width="90vw"
            bodyStyle={{ height: '83vh' }}
            style={{
                overflowY: 'scroll',
                top: '16px',
                // height: '80vh',
            }}
            open
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="result" style={{ backgroundColor: '#001529', color: 'white' }}>
                    Total Marks : {totalMarks}
                </Button>,
                <div
                    key={Math.random()}
                    style={{ display: 'inline', marginLeft: '8px', marginRight: '8px' }}
                >
                    <span
                        style={{
                            marginRight: '4px',
                            fontWeight: 700,
                            fontSize: '16px',
                        }}
                    >
                        Marks:
                    </span>
                    <InputNumber
                        min={0}
                        max={Number(data.marks)}
                        defaultValue={0}
                        onChange={onChange}
                    />
                </div>,
                <Button key="back" type="primary" danger onClick={handleCancel}>
                    Close
                </Button>,

                <Button
                    key="submit"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    onClick={onFinish}
                >
                    Submit
                </Button>,
            ]}
        >
            <div>
                {data && (
                    <div className="pdf-reader-div">
                        <object data={testLink} type="application/pdf" width="100%" height="100%">
                            <p>
                                Alternative text - include a link{' '}
                                <a href="http://africau.edu/images/default/sample.pdf">
                                    to the PDF!
                                </a>
                            </p>
                        </object>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default ViewPDF;
