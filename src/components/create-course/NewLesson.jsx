/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Upload } from 'antd';
import React, { useState } from 'react';
import NewEditor from '../Editor/NewEditor';
// import CourseAttachment from '../upload/CourseAttachment';

import CourseDropDown from './CourseDropDown';

const FormData = require('form-data');

function NewLesson({ handleTitle, handleDelta }) {
    // states
    const _LessonID = Math.random().toString(16).slice(2);
    const [form] = Form.useForm();
    const [edi, setEdi] = useState({});
    const [disableForm, setDisableForm] = useState(true);
    const [courseUid, setCourseUid] = useState('');
    const [studyMaterial, setStudyMaterial] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(false);

    const bodyFormData = new FormData();

    // const onFinish = (values) => {
    //     // console.log('Success:', values);
    //     // console.log(`real Delta :`, edi);

    //     const lessonObject = {
    //         title: values.lesson_title,
    //         delta: JSON.stringify(edi),
    //     };

    //     bodyFormData.append('title', lessonObject.title);
    //     bodyFormData.append('delta', lessonObject.delta);

    //     const attachmentsName = [];
    //     fileList.forEach((v) => {
    //         attachmentsName.push(v.name);
    //     });

    //     console.log(attachmentsName);
    //     bodyFormData.append('resources', attachmentsName);

    //     const config = {
    //         method: 'post',
    //         url: 'http://localhost:3003/api/course/addlesson',
    //         headers: {
    //             course_uid: courseUid,
    //             lessonid: _LessonID,
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         data: bodyFormData,
    //     };

    //     // handleUpload();
    //     axios(config)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 form.resetFields();
    //                 message.success('Lesson Added');
    //             }
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    const handleUpload = (values) => {
        const fileForm = new FormData();
        const lessonObject = {
            title: values.lesson_title,
            delta: JSON.stringify(edi),
        };
        // console.log(`here : ${fileList[0]}`);
        fileForm.append('title', lessonObject.title);
        fileForm.append('delta', lessonObject.delta);
        fileList.forEach((file) => {
            // eslint-disable-next-line no-param-reassign
            fileForm.append('file', file);
        });

        // fileForm.append('hi', 'hello');
        // console.log(fileList[0]);
        setUploading(true); // You can use any AJAX library you like

        // fetch('http://localhost:3003/api/course/addlesson', {
        fetch('http://localhost:3003/api/course/lesson/add', {
            method: 'POST',
            body: fileForm,
            headers: {
                course_uid: courseUid,
                lesson_id: _LessonID,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    message.success('Lesson Added successfully.');
                }
                setFileList([]);
                setUploadStatus(true);
                // onFinish(values);
            })
            .catch((e) => {
                console.log(e);
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const handleChange = (ev) => {
        console.log(ev.target.value);
        // handleTitle(ev.target.value);
    };
    const handledelta = (delta) => {
        setEdi(delta);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onSelect = (v) => {
        setCourseUid(v);
        setDisableForm(false);
    };
    const Fileprops = {
        name: 'file',
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);

            // console.log('new ', newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        onChange: (v) => {
            // console.log('onChng', fileList);
        },
        fileList,
    };

    return (
        <div>
            <div>
                <CourseDropDown detectSelect={onSelect} />
            </div>

            <div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpload}
                    onFinishFailed={onFinishFailed}
                    disabled={disableForm}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="lesson_title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Lesson Title',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter Lesson Title" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <NewEditor handleChange={handledelta} />
                    </Form.Item>
                    <Form.Item className="atchm">
                        <Upload {...Fileprops}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default NewLesson;
