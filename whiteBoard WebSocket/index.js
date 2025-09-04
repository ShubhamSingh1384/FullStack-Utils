const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => { // frontend se connection
  socket.on("user-message", (message) => { // agar client se koi v "user-message" aata hai to 
    io.emit("message", message);           // usko emit k help se sb ko bta do
    console.log(message)
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));
