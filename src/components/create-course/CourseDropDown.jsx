/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Select } from 'antd';
import './dropDown.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const { Option } = Select;

function CourseDropDown({ detectSelect }) {
    const [courseList, setCourseList] = useState('[]');
    const { userUuid } = useAuth();
    useEffect(() => {
        const data = JSON.stringify({
            id: userUuid,
        });

        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/course/teacher-course',
            headers: {
                'Content-Type': 'application/json',
                id: userUuid,
            },
        };
        // console.log(config.url);
        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data.courses));
                const { courses } = response.data;
                let moid = courses.map((v) => ({
                    value: v.id,
                    label: v.name,
                }));
                moid = JSON.stringify(moid);
                setCourseList(moid);
                // console.log(moid);
            })
            .catch((error) => {
                console.log(error);
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
                width: '50%',
            }}
            onChange={handleChange}
            options={JSON.parse(courseList)}
        />
    );
}

export default CourseDropDown;
