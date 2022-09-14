/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DefaultLayout from '../DefaultLayout';
import ViewStudentCourse from '../ViewCourse/ViewStudentCourse';

// import QuillE from '../Editor/QuillE';

function Course() {
    const [val, setVal] = useState({});
    return (
        <div>
            <DefaultLayout>
                <ViewStudentCourse />
            </DefaultLayout>
        </div>
    );
}

export default Course;
