/* eslint-disable  */
/* eslint-disable no-new */
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useCallback } from 'react';

function QuillE() {
    const toolbar = [
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
        [{ color: [] }, { background: [] }],
        ['clean'],
    ];
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        new Quill(editor, { theme: 'snow', modules: { toolbar } });
    }, []);

    return <div id="container" ref={wrapperRef} />;
}

export default QuillE;
