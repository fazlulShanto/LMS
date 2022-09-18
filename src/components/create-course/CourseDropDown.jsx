/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Select } from 'antd';
import './dropDown.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

function CourseDropDown({ detectSelect }) {
    const [courseList, setCourseList] = useState('[]');

    useEffect(() => {
        const apiUrl = 'http://localhost:3003/api/user/get/12';
        axios
            .get(apiUrl)
            .then((res) => {
                // console.log(res.data.courses);
                const rawCourses = res.data.courses || [];
                const courses = rawCourses?.map((v, i) => ({
                    label: v.title,
                    value: v.uid,
                }));
                const kd = JSON.stringify(courses);
                setCourseList(kd);
            })
            .catch((er) => {
                console.log(er);
            });
    }, [courseList]);

    const handleChange = (value) => {
        // console.log(`selected ${value}`);

        if (detectSelect) {
            detectSelect(value);
        }
    };

    return (
        <Select
            placeholder="Select a course"
            style={{
                width: 200,
            }}
            onChange={handleChange}
            options={JSON.parse(courseList)}
        />
    );
}

export default CourseDropDown;
