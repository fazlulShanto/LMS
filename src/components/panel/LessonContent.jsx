/* eslint-disable no-unused-vars */
import { Collapse } from 'antd';
import React from 'react';
import ViewEditor from '../Editor/ViewEditor';
import VideoPlayer from '../videoplayer/VideoPlayer';
import './LessonContent.css';

const { useState } = React;
const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found:a welcome guest in many households across the world.
`;

function LessonContent({ delta, data }) {
    // console.log('dt');
    // console.log(JSON.parse(data));
    const rawDelta = JSON.parse(delta);
    const { resources } = data;
    return (
        <div>
            <ViewEditor delta={rawDelta} />
            <div>
                {resources.map((v) => {
                    // console.log(v.slice(v.indexOf('_') + 1));
                    const type = v.split('.').pop() || '';
                    const fileName = v.slice(v.indexOf('_') + 1) || 'Download';
                    if (['mp4', 'avi', 'mov', 'mkv'].includes(type)) {
                        return <VideoPlayer videoSource={v} key={Math.random()} />;
                    }
                    return (
                        <div className="doc-resources" key={Math.random()}>
                            <a
                                href={v}
                                download="My_File.pdf"
                                target="_blank"
                                rel="noreferrer"
                                key={Math.random()}
                            >
                                {fileName}
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LessonContent;
