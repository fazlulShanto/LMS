/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Avatar } from 'antd';
import axios from 'axios';

import React, { useEffect, useState } from 'react';

function Conversation({ data, currentuser }) {
    const [name, setName] = useState('');
    const [targetUserId, setTargetId] = useState('');
    const targetUser = data?.members?.filter((v) => v !== currentuser).pop();

    useEffect(() => {
        const config = {
            method: 'get',
            url: `http://localhost:3003/api/user/get/${targetUser}`,
        };

        axios(config)
            .then((response) => {
                // console.log(response.data.firstname);
                setName(response.data.firstname);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="chat-avatar-card">
            <Avatar
                className="chat-avatar"
                src={`http://localhost:3003/users/${targetUser}.png`}
                size={40}
            />
            <h2 className="chat-avatar-title">{name}</h2>
        </div>
    );
}

export default Conversation;
