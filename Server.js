const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
require("dotenv").config();
require("./Confiq/Confiq");
const messageRouter = require("./Router/router");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);

app.use("/io/message", messageRouter);

const connectedUser = [];

io.on("connection", (socket) => {
  // Handle user connection
  socket.on("userConnection", ({ sender }) => {
    connectedUser[sender] = socket.id;
    io.emit("userConnection", sender);
  });

  // Handle admin connection
  socket.on("AdminConnection", ({ admin }) => {
    connectedUser[admin] = socket.id;
    io.emit("AdminConnection", admin);
  });

  // sending message
  socket.on("message", ({ message, sender, receiver }) => {
    const receiverId = connectedUser[receiver];
    if (receiverId) {
      io.to(receiverId).emit("message", { message, sender });
    }
  });
});

const port = 3333;
server.listen(port, () => {
  console.log(`server connected on ${port}`);
});
