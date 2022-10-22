/* eslint-disable jsx-a11y/no-static-element-interactions */

import { DeleteTwoTone } from '@ant-design/icons';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const todoApiUrl = `http://localhost:3003/api/todo/`;
export default function TodoOutput({ userId, hotReload }) {
    const [del, setDel] = useState(true);
    const [todoItems, setTodoItem] = useState([]);
    const handleClick = (ev, tid) => {
        const elementId = tid || ev.target.id;
        const config = `${todoApiUrl}delete/${userId}/?tid=${elementId}`;

        axios
            .delete(config)
            .then(() => {
                // console.log('deleted', response);
                setDel(!del);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        // axios.get();
        const config = {
            url: `${todoApiUrl}get/${userId}`,
        };
        axios
            .get(config.url)
            .then((response) => {
                const dat = response.data.map((v) => {
                    // console.log(v.tid);
                    const { tid, text } = v;
                    return { tid, text };
                });
                setTodoItem(dat);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId, hotReload, del]);

    return (
        <div className="todoListParent">
            {todoItems.map((v) => (
                <div key={v.tid} id={v.tid} className="TodolistItem">
                    <div>{v.text}</div>

                    <DeleteTwoTone
                        style={{ fontSize: '16px', color: '#ffffff' }}
                        // twoToneColor="#ed205f"
                        onClick={(ev) => handleClick(ev, v.tid)}
                    />
                </div>
            ))}
        </div>
    );
}
