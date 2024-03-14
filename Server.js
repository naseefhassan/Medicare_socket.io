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

    // Handle user connection
    socket.on('userConnection', ( {user} ) => {
        connectedUser[user]=socket.id
        console.log(`${user} connected, UserId:${socket.id}`)
        io.emit('userConnection', user)
    })

    // Handle admin connection
     socket.on('AdminConnection', ( {admin} ) => {
        connectedUser[admin]=socket.id
        console.log(`${admin} connected, UserId:${socket.id}`)
        io.emit('AdminConnection', admin)
    })

    // sending message
    socket.on('message',({message, sender, receiver})=>{
        console.log(`${message} from ${sender} to ${receiver}`);
        const receiverId = connectedUser[receiver]
        if(receiverId){
            io.to(receiverId).emit("message",{message, sender})
            console.log(`message sent to ${receiver}`);
        }else{
            console.log(`recipient ${receiver} not found`);
        }
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