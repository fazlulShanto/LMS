/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ViewEditor({ delta }) {
    const [value, setValue] = useState('');
    const [con, setCon] = useState();
    // console.log(value);

    useEffect(() => {
        // console.log(delta);
        setValue(delta);
    }, []);

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                    { align: '-1' },
                    { align: '+1' },
                ],
                ['code-block'],
                ['link', 'image', 'video'],
                ['clean'],
            ],
        }),
        []
    );

    const formats = [
        'header',
        'bold',
        'italic',
        'strike',
        'underline',
        'background',
        'indent',
        'blockquote',
        'align',
        'list',
        'code-block',
        'color',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];

    return (
        // <Form onFinish={onFinish}></Form>
        <div
            style={{
                height: '300px',
                overflow: 'scroll',
            }}
        >
            <ReactQuill
                defaultValue={delta}
                theme="bubble"
                value={value}
                readOnly
                modules={modules}
                formats={formats}
            />
        </div>
    );
}

export default ViewEditor;
