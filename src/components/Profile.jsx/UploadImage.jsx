/* eslint-disable react/jsx-props-no-spreading */
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React from 'react';

const props = {
    name: 'file',
    showUploadList: false,
    action: 'http://localhost:3003/api/upload/img',

    beforeUpload: (file) => {
        const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
        if (!isPNG) {
            message.error(`${file.name} is not a png file`);
        }
        return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
        // console.log(info.fileList);
        if (info.file.status === 'done') {
            message.success(`Image uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
function UploadImage({ userid }) {
    // console.log(userid);
    return (
        <Upload {...props} maxCount={1} headers={{ id: userid }}>
            <Button icon={<UploadOutlined />} />
        </Upload>
    );
}
export default UploadImage;
