/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import { DeleteOutlined } from '@ant-design/icons';
import { Collapse, message } from 'antd';
import axios from 'axios';
import React from 'react';

import LessonContent from '../panel/LessonContent';
import Confirm from '../popconfirm/Confirm';

const { useState } = React;
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found:a welcome guest in many households across the world.
`;

function LessonWithControll({ delta, courseUid }) {
    // console.log('DD');
    // console.log(delta);

    const lessons = delta?.length ? delta : [];

    const onChange = (key) => {
        console.log(key);
    };

    const deleteLesson = (lessonId) => {
        // lesson_id, course_uid
        const config = {
            method: 'post',
            url: 'http://localhost:3003/api/course/deletelesson',
            headers: {
                'Access-Control-Allow-Origin': '*',
                course_uid: courseUid,
                lesson_id: lessonId,
            },
        };

        axios(config)
            .then((response) => {
                if (response.status === 200) {
                    message.success('Lesson Deleted');
                }
            })
            .catch((error) => {
                message.error(`can't delete the Lesson!`);
                console.log(error);
            });
        // console.log('delete maro mujeh', courseUid);
    };

    const genExtra = (id) => {
        // console.log('exlcusive', id);
        const deleteButton = (
            <DeleteOutlined
                onClick={(event) => {
                    event.stopPropagation();
                    // message.success('danm dco');
                }}
            />
        );
        return (
            <Confirm
                id={id}
                exec={() => {
                    deleteLesson(id);
                }}
            >
                {deleteButton}
            </Confirm>
        );
    };
    // console.log(lessons);
    // useEffect(() => {}, [delta.length]);
    return (
        <Collapse defaultActiveKey={['1']} onChange={onChange}>
            {/* <Panel header="Lesson 1" key="1" extra={genExtra()}>
                <LessonContent data={objs} key={Math.random()} />
            </Panel> */}
            {lessons.map((v, idx) => (
                <Panel
                    header={`Lesson ${idx + 1} : ${v.title}`}
                    key={v.id || Math.random()}
                    extra={genExtra(v?.id)}
                >
                    {/* {console.log(v.id)} */}
                    <LessonContent delta={v.delta} data={v} />
                </Panel>
            ))}
        </Collapse>
    );
}

export default LessonWithControll;
