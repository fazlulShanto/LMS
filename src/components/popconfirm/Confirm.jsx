/* eslint-disable no-unused-vars */
import { Popconfirm } from 'antd';
import React from 'react';

const cancel = (e) => {
    // console.log(e);
    // message.error('Click on No');
};

function Confirm({ text, children, exec }) {
    const titleText = text || 'Are you sure to delete this?';
    const confirm = (e) => {
        if (exec) {
            // message.success('Click on Yes');
            exec();
        }
    };

    return (
        <Popconfirm
            title={titleText}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            {children}
        </Popconfirm>
    );
}

export default Confirm;
