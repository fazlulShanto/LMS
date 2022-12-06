/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { Empty } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ChatAction from './ChatAction';

function ChatBox({ chat, currentuser, setSendMessage, receiveMessage }) {
    const targetUser = chat?.members?.filter((v) => v !== currentuser).pop();

    const [name, setName] = useState('');
    const config = {
        method: 'get',
        url: `http://localhost:3003/api/user/get/${targetUser}`,
    };
    useEffect(() => {
        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                const pd = `${response.data.firstname}  ${response.data.lastname}`;
                setName(pd);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <div>
            <div className="chat-box-container">
                {chat ? (
                    // sender, receiver, title, avatar
                    <ChatAction
                        chat={chat}
                        sender={currentuser}
                        receiver={targetUser}
                        title={name}
                        receiveMessage={receiveMessage}
                        setSendMessage={setSendMessage}
                    />
                ) : (
                    <div
                        style={{
                            height: '70vh',
                            // border: '1px solid red',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Empty description={false} />
                        <h2>Start a New chat</h2>
                        <h3>Or</h3>
                        <h2>Select a Chat</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatBox;
