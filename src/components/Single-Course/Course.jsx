/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Editor from '../Editor/Editor';
// import QuillE from '../Editor/QuillE';

function Course() {
    const [val, setVal] = useState({});
    // useEffect(() => {
    //     const config = {
    //         method: 'post',
    //         url: 'http://localhost:3003/api/upload',
    //         headers: {
    //             del: 'mah bio',
    //         },
    //     };

    //     axios(config)
    //         .then((response) => {
    //             console.log(JSON.stringify(response.data));
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    return (
        <div>
            <Editor />
        </div>
    );
}

export default Course;
