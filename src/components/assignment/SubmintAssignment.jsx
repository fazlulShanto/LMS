/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
// import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

function SubmintAssignment({ quiz }) {
    const { userUuid } = useAuth();

    const loc = useLocation().pathname.split('/').pop();
    const timeDate = (ms) => {
        if (typeof ms === 'string') {
            ms = parseInt(ms, 10);
        }
        const origin = new Date(ms);
        const date = origin.toLocaleDateString();
        const time = origin.toLocaleTimeString();

        return `${date} ${time}`;
    };

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('userid', userUuid);
        formData.append('taskid', quiz.taskid);
        setUploading(true);
        // You can use any AJAX library you like
        fetch('http://localhost:3003/api/task/assignment', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };
    const props = {
        multiple: false,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const [antdform] = useForm();
    const nav = useNavigate();

    const onFinish = (values) => {
        // console.log('Success:', values);
        const data = new FormData();
        data.append('userid', userUuid);
        data.append('taskid', quiz.taskid);
        const ans = Object.keys(values).map((v) => ({
            qid: v,
            ans: values[v],
        }));
        // ans.userid = Math.random().toString(36).slice(2);
        data.append('response', JSON.stringify(ans));
        const config = {
            method: 'post',
            url: `http://localhost:3003/api/task/response`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data,
        };
        // axios(config)
        //     .then((resp) => {
        //         // const = resp.data;
        //         const { correct } = resp.data;
        //         setModalText(correct);
        //         // console.log(resp.data);
        //         setIsModalOpen(quiz.publish_result);
        //         // console.log(resp);
        //         message.success(`Your Response has sent successfully!`, 0.8);
        //         antdform.resetFields();
        //         nav(`/course/${quiz.course_id}`);
        //     })
        //     .catch((er) => {
        //         console.log(er);
        //     });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error(`Failed!\nPlease Try agian!`, 0.8);
    };
    return (
        quiz && (
            <div className="quiz-submit-div">
                <h1
                    style={{
                        marginTop: '8px',
                        marginBottom: '18px',
                    }}
                >
                    Upload Assignment
                </h1>
                <Upload {...props} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{
                        marginTop: 16,
                    }}
                >
                    {uploading ? 'Uploading' : 'Submit'}
                </Button>
            </div>
        )
    );
}

export default SubmintAssignment;
