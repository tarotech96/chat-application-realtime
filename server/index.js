const express = require('express');
const socketio = require('socket.io');
const htpp = require('http');

const { addUser, removeUser, getUser, getUserInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = htpp.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected!!');

    // event login
    socket.on('login', ({ name, room }, callback) => {
        const error = false;
        const user = addUser({ id: socket.id, name, room });
        if (!error) {
            return callback(error);
        }

        // event message
        // server send data include user,message.. to client
        socket.emit('message', { user: 'admin', 'text': `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });
        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});

        callback();
    });

    // event sendMessage
    // server will send data include user,room to client
    socket.on('sendMessage', (message, callback) => {
        console.log(message);
        const user = getUser(socket.id);
        io.emit('message', {user: user.name, text: message});
        io.emit('roomData', {room: user.room, users: getUserInRoom(user.room)});
        // io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});

        callback();
    });

    // event disconnect will be fired when a user disconnect to server
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`});
        }
    })
})

app.use(router);




// set port server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));