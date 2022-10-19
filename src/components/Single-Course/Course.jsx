/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import ViewStudentCourse from '../ViewCourse/ViewStudentCourse';

// import QuillE from '../Editor/QuillE';

function Course() {
    const [val, setVal] = useState({});
    return <ViewStudentCourse />;
}

export default Course;
