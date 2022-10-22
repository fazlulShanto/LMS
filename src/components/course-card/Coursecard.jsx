/* eslint-disable no-unused-vars */
import { Button } from 'antd';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Activeday from '../active-day/Activeday';
import './coursecard.css';

const temp = {
    _id: '634ee111aba40afbd351800c',
    id: '7aaa050f0d859',
    instructor: 'teacher1',
    creatorid: 'qn1j1vj8skn',
    name: 'course name',
    code: 'course code',
    desc: 'course Description',
    othersinfo: 'Course other inof',
    lessons: [],
    resources: [],
    students: [],
    lastupdate: '00/00/0000',
    tasks: [],
    activeday: [1, 2, 3, 4, 5],
    __v: 0,
};

export default function Coursecard({ data = temp }) {
    const [courseName, setCourseName] = useState(data.name);
    const [courseCode, setcourseCode] = useState(data.code);
    const [teacherName, setteacherName] = useState(data.instructor);
    const [lastUpdate, setlastUpdate] = useState(data.lastupdate);
    const [totalStudent, settotalStudent] = useState(data.students.length);
    const [totalLesson, settotalLesson] = useState(data.lessons.length);
    const [activeDay, setActiveDay] = useState(data.activeday);
    const [courseUid, setCourseUid] = useState(data.id);
    return (
        <div className="course-card-container">
            <div className="course-info-section">
                <h2>
                    {courseCode} : {courseName}
                </h2>
                <h4> {teacherName} </h4>
                <Activeday days={activeDay} />
                <hr className="hr-course-card" />
                <div>
                    <Link to={`/course/${courseUid}`}>
                        <Button className="course-card-button" type="primary">
                            View Course
                        </Button>
                    </Link>
                    <p className="stat-p">Total Lesson : {totalLesson}</p>
                    <p className="stat-p">Total Students : {totalStudent}</p>
                    <p className="stat-p">Last Updated : {lastUpdate} </p>
                </div>
            </div>
        </div>
    );
}
