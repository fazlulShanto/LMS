/* eslint-disable no-unused-vars */
import { Collapse } from 'antd';
import React from 'react';
import ViewEditor from '../Editor/ViewEditor';
import './LessonContent.css';

const { useState } = React;
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found:a welcome guest in many households across the world.
`;

function LessonContent({ data }) {
    console.log('dt');
    console.log(JSON.parse(data));
    const k = JSON.parse(data);
    return <ViewEditor delta={k} />;
}

export default LessonContent;
