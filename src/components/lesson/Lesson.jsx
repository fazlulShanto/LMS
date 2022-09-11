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

function Lesson() {
    const objs = {
        title: 'Lesson 1: this is title',
        delta: {
            ops: [
                {
                    insert: 'Lesson Header',
                },
                {
                    attributes: {
                        indent: 3,
                        header: 1,
                    },
                    insert: '\n',
                },
                {
                    insert: 'Welcome to the lesson 1 \n',
                },
            ],
        },
    };

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

    return (
        <Collapse defaultActiveKey={['1']} onChange={onChange}>
            <Panel header="Lesson 1" key="1" extra={genExtra()}>
                <LessonContent data={objs} />
            </Panel>
        </Collapse>
    );
}

export default Lesson;
