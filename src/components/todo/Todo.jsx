/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './todo.css';
import TodoInput from './TodoInput';

// eslint-disable-next-line no-unused-vars
// const todoItems = ['data 100', 'data 200', 'data 300', 'data 400'];
const todoApiUrl = `http://localhost:3003/api/todo/`;

export default function Todo({ todoData = [], userId }) {
    // eslint-disable-next-line no-unused-vars
    const [todoItems, setTodoItem] = useState([]);
    const getTodoFromDb = () => {
        const config = {
            url: `${todoApiUrl}get/${userId}`,
        };
        console.log(config.url);
        axios
            .get(config.url)
            .then((response) => {
                // setTodoItem();
                const dat = response.data.map((v) => v.text);
                // console.log(dat);
                setTodoItem(dat);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log('done');
    };
    useEffect(() => {
        // axios.get();
        getTodoFromDb(userId);
    }, [userId]);
    return (
        <div className="todo">
            <div>
                <h3 style={{ textAlign: 'center' }}>Todo:</h3>
                <ol>
                    {todoItems.map((v) => (
                        <li key={Math.random()}>{v}</li>
                    ))}
                </ol>
            </div>
            <div className="input-todo">
                <TodoInput userId={userId} />
            </div>
        </div>
    );
}
