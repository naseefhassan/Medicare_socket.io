const express = require('express');
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const http = require('http')
const socketIO = require('socket.io');
require('dotenv').config();
require('./Confiq/Confiq');

app.use(cors())
const server = http.createServer(app)
const io = socketIO(server)

const connectedUser = []

io.on('connection', (socket) => {

    socket.on('addUser', (token) => {
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decodedToken);
    })

   
    socket.on('chat_msg', ({ message }) => {

        console.log(message, 'msg');
        io.emit('chat_message', message)
    })

    socket.on('userConnection', ( {user} ) => {
        connectedUser[user]=socket.id
        console.log(`${user} coonected, UserId:${socket.id}`)
        io.emit('userConnection', user)
    })

     socket.on('AdminConnection', ( {admin} ) => {
        connectedUser[admin]=socket.id
        console.log(`${admin} coonected, UserId:${socket.id}`)
        io.emit('AdminConnection', admin)
    })
    
    
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
    console.log(connectedUser);


})

const port = 3333
server.listen(port, () => {
    console.log(`server connected on ${port}`);
})