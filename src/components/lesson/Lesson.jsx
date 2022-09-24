/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import { SettingOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import React from 'react';

import LessonContent from '../panel/LessonContent';

const { useState } = React;
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found:a welcome guest in many households across the world.
`;

function Lesson({ delta }) {
    // console.log('DD');
    // console.log(delta);

    const lessons = delta?.length ? delta : [];

    const onChange = (key) => {
        console.log(key);
    };

    const genExtra = () => (
        <SettingOutlined
            onClick={(event) => {
                console.log('danm dco');
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );
    // console.log(lessons);
    // useEffect(() => {}, [delta.length]);
    return (
        <Collapse defaultActiveKey={['1']} onChange={onChange}>
            {/* <Panel header="Lesson 1" key="1" extra={genExtra()}>
                <LessonContent data={objs} key={Math.random()} />
            </Panel> */}
            {lessons.map((v, idx) => (
                <Panel header={`Lesson ${idx + 1} : ${v.title}`} key={v.id || Math.random()}>
                    {/* {console.log(v.id)} */}
                    <LessonContent delta={v.delta} data={v} />
                </Panel>
            ))}
        </Collapse>
    );
}

export default Lesson;
