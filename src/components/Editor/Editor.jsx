/* eslint-disable no-unused-vars */
import { message } from 'antd';
import axios from 'axios';
import ImageResize from 'quill-image-resize-module-react';
import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);
function Editor({ handleChange }) {
    const [value, setValue] = useState('');
    const [con, setCon] = useState();
    // console.log(value);
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log('Success:', value);
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/upload',
            headers: {
                del: JSON.stringify(value),
            },
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                message.success('Updated', 1);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/upload',
        };

        axios(config)
            .then((response) => {
                // console.log(response.data.data);
                const { data } = response.data;
                setValue(JSON.parse(data));
            })
            .catch((error) => {
                console.log(error);
            });
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

            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
            imageResize: {
                parchment: Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize'],
            },
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
    const handleChange2 = (content, delta, source, editor) => {
        handleChange(editor.getContents());
        // console.log('cls ', delta);
        setValue(editor.getContents());
        // console.log(editor.getContents());
        setCon(content);

        // console.log(`changes from hndle`, value);
    };
    const exc = handleChange || handleChange2;
    // console.log(handleChange);
    return (
        // <Form onFinish={onFinish}></Form>
        <ReactQuill
            theme="snow"
            value={value}
            onChange={handleChange2}
            modules={modules}
            formats={formats}
        />
    );
}

export default Editor;
