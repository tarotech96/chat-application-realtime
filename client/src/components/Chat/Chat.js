import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from './../InfoBar/InfoBar';
import Messages from './../Messages/Messages';
import Input from './../Input/Input';
var socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const BASE_URL = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(BASE_URL);

        setName(name);
        setRoom(room);

        // emit event login and send data {user'name, room chat} to server
        socket.emit('login', { name: name, room: room }, () => { });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [BASE_URL, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
            messages.push(message);
            setMessage([...messages]);
        }, [messages]);
    });

    // function for sending messages
    const sendMesage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="container">
            <div className="chat">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMesage={sendMesage} />
            </div>
        </div>
    )
}

export default Chat;
