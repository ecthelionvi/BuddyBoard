import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

let boards = {};

io.on("connection", (socket) => {
  socket.on("create board", ({ name }) => {
    let boardCode = Math.floor(Math.random() * 10000);
    boards[boardCode] = { participants: [name] };
    socket.join(boardCode.toString());
    socket.emit("board created", {
      boardCode,
      participants: boards[boardCode].participants,
    });
    console.log(`Board created with code: ${boardCode}`);
  });

  socket.on("join board", ({ name, boardCode }) => {
    if (boards[boardCode]) {
      boards[boardCode].participants.push(name);
      socket.join(boardCode.toString());
      io.to(boardCode.toString()).emit("participant joined", {
        participants: boards[boardCode].participants,
        boardCode, // send boardCode back to client
      });
    } else {
      socket.emit("join failed", "Invalid board code");
    }
  });

  socket.on("object modified", ({ obj, boardCode }) => {
    if (boards[boardCode]) {
      socket
        .to(boardCode.toString())
        .emit("object modified", { obj, boardCode });
    }
  });

  socket.on("object added", ({ obj, boardCode }) => {
    if (boards[boardCode]) {
      socket.to(boardCode.toString()).emit("object added", { obj, boardCode });
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
