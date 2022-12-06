/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { AutoComplete } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import { io } from 'socket.io-client';
import './chat.css';
import ChatBox from './ChatBox';
import Conversation from './Conversation';

function Chat({ sender }) {
    const [onlyChat, setOnlyChat] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [searchOption, setSearchOption] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    // socket stuff
    const socket = useRef();
    const onSearch = (values) => {
        console.log(values);
    };
    const onSelect = (value) => {
        // console.log('onSelect', value);
        if (allUser.length) {
            const verdict = allUser.find((v) => v.name === value);
            const data = JSON.stringify({
                senderid: sender,
                receiverid: verdict.userid,
            });

            const config = {
                method: 'post',
                url: 'http://localhost:3003/api/chat',
                headers: {
                    'Content-Type': 'application/json',
                },
                data,
            };

            axios(config)
                .then((response) => {
                    setChats([response.data, ...chats]);
                    setCurrentChat(response.data);
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    // register the user in socket server
    useEffect(() => {
        socket.current = io('http://localhost:3003');
        socket.current.emit('new-user-add', sender);
        socket.current.on('get-users', (users) => {
            // console.log(`online users :`, users);
            setOnlineUser(users);
        });

        const config = {
            method: 'get',
            url: 'http://localhost:3003/api/user/userlist',
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const modifiedList = response.data?.map((v) => ({
                    value: v.name,
                }));
                // console.log(modifiedList);
                // console.log(options);
                setSearchOption(modifiedList);
                setAllUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sender, onlyChat]);
    // receive message from socket server
    useEffect(() => {
        socket.current.on('receive-message', (data) => {
            setReceiveMessage(data);
        });
    }, []);

    // send message to socket server

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    // console.log('user id ', sender);
    useEffect(() => {
        const getChats = async () => {
            try {
                const config = {
                    method: 'get',
                    url: `http://localhost:3003/api/chat/${sender}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                axios(config)
                    .then((response) => {
                        // console.log(JSON.stringify(response.data));
                        setChats(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [chats.length]);

    console.log(chats);
    return (
        <div className="chat-container">
            <div className="chat-user-container">
                <div>
                    <AutoComplete
                        options={searchOption}
                        style={{
                            width: 250,
                        }}
                        listHeight={5 * 32}
                        onSelect={onSelect}
                        // onSearch={onSearch}
                        filterOption={(inputValue, option) => {
                            // console.log(`input`, inputValue, option.value.toUpperCase());
                            // console.log(option);
                            const lowInput = inputValue.toUpperCase();

                            return option.value.toUpperCase().indexOf(lowInput) !== -1;
                        }}
                        placeholder="control mode"
                    />
                </div>
                <div className="chat-user-list">
                    <div className="single-chat-user-list">
                        {chats.map((chat) => (
                            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                            <div
                                key={Math.random()}
                                onClick={() => {
                                    console.log(`got clicked`, chat._id);
                                    setCurrentChat(chat);
                                    setOnlyChat(chat._id);
                                }}
                            >
                                <Conversation data={chat} currentuser={sender} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="chat-message-container">
                <ChatBox
                    receiveMessage={receiveMessage}
                    setSendMessage={setSendMessage}
                    chat={currentChat}
                    currentuser={sender}
                />
            </div>
        </div>
    );
}

export default Chat;
