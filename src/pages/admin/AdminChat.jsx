import React from 'react';
import { io } from 'socket.io-client';
import AdminLayout from './AdminLayout';

const socket = io('http://localhost:3003');

function AdminChat() {
    socket.on('connect', () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on('disconnect', () => {
        console.log(socket.id); // undefined
    });
    return <AdminLayout>AdminChat</AdminLayout>;
}

export default AdminChat;
