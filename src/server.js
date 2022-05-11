const express  = require('express');
const http  = require('http');
const socketIO  = require('socket.io');
const cors = require('cors')
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      method: ['GET','POST']
    }
  });

let userCount = 1;

io.on('connection', socket => {
    userCount++;

    const username = `User ${userCount}`;

    socket.emit('addUsername', username);
    io.sockets.emit('createMessage', {
        content: `${username} connected`
    });

    socket.on('sendMessage', (messageObject) => {
        io.sockets.emit('createMessage', messageObject);
    });

    socket.on('disconnected', () => {
        io.sockets.emit('createMessage', {
            content: `${username} disconnected`
        })
    });
});

server.listen(4000, () => console.log(`Listening on port 4000`));