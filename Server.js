const express = require('express');
const app = express()
const http = require('http')
const jwt = require('jsonwebtoken')
const { Server } = require('socket.io')
const cors = require('cors')
require('dotenv').config();
require('./Confiq/Confiq');

const ChatRoute = require('./Router/Chat')
const MessageRoute = require('./Router/MessageRouter')

app.use('/chat', ChatRoute)
app.use('/message',MessageRoute)

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: {
            origin: process.env.Origin,
            methods: ['GET', "POST"]
        }
    }
})


io.on('connection', (socket) => {
    console.log(`new client connected ${socket.id}`);

    socket.on('addUser', (token)=>{
        console.log(token)
        const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
        console.log(decodedToken);
    })

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    socket.on('chat_msg', ({ message }) => {
        console.log(message, 'msg');
        io.emit('chat_message', message)
    })
})

const port = 3333
server.listen(port, () => {
    console.log(`server connected on ${port}`);
})