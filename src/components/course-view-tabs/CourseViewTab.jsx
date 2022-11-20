/* eslint-disable no-unused-vars */
import { Collapse } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lesson from '../lesson/Lesson';

const { Panel } = Collapse;

function CourseViewTab({ hidden }) {
    const [values, setValues] = useState({});
    const [courseCode, setCourseCode] = useState(0);
    const [courseDesc, setCourseDesc] = useState('');
    const [otherInfo, setOtherInfo] = useState('');
    const [courseTeacher, setCourseTeacher] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseLessons, setLessons] = useState('');
    const [validCourse, setValidity] = useState(true);
    // console.log(hidden);
    const nav = useNavigate();
    const loc = useLocation().pathname.split('/').pop();

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/course',
            headers: {
                'Access-Control-Allow-Origin': '*',
                id: loc,
            },
        };
        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data.lessons);
                    const { code, desc, instructor, name, othersinfo, lessons } = response.data;
                    setCourseCode(code);
                    setCourseName(name);
                    setCourseDesc(desc);
                    setCourseTeacher(instructor);
                    setOtherInfo(othersinfo);
                    // console.log(lessons);
                    setLessons(lessons);
                }
            })
            .catch((error) => {
                console.log(error);
                setValidity(false);
                hidden(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loc]);

    return (
        <div className="course-page-container">
            <div className="course-info-div">
                <h1>
                    {courseCode} : {courseName}
                </h1>
                <h3>Teacher : {courseTeacher}</h3>
            </div>
            {/* <div className="course-syllabus-div">
                <h2>Syllabus & Recommended Books</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{courseDesc}</p>
            </div>
            <div className="course-marks-div">
                <h2>Marks distribution & Others Info</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}> {otherInfo} </p>
            </div> */}
            <Collapse>
                <Panel header="Syllabus & Recommended Books" key="1">
                    <p style={{ whiteSpace: 'pre-wrap' }}>{courseDesc}</p>
                </Panel>
                <Panel header="Marks distribution & Others Info" key="2">
                    <p style={{ whiteSpace: 'pre-wrap' }}> {otherInfo} </p>
                </Panel>
            </Collapse>

            <div className="course-lesson-div">
                <Lesson delta={courseLessons} />
            </div>
        </div>
    );
}

export default CourseViewTab;
