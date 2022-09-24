/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';

function LessonAttachment({ handleFiles }) {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        // console.log(`here : ${fileList[0]}`);
        fileList.forEach((file) => {
            formData.append('file', file);
        });
        // console.log(fileList[0]);
        setUploading(true); // You can use any AJAX library you like

        fetch('http://localhost:3003/api/upload/file', {
            method: 'POST',
            body: formData,
            headers: {
                courseCode: 'CSE0000',
                lesson: 1,
            },
        })
            .then((res) => {
                res.status;
            })
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch((e) => {
                console.log(e);
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props = {
        name: 'file',
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
            if (handleFiles) {
                handleFiles(newFileList);
            }
            console.log('new ', newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        onChange: (v) => {
            console.log('onChng', fileList);
            if (handleFiles) {
                handleFiles(fileList);
            }
        },
        fileList,
    };
    return (
        <div>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            {/* <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                    marginTop: 16,
                }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button> */}
        </div>
    );
}

export default LessonAttachment;
