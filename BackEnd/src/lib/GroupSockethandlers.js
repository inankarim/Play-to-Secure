import { Server } from "socket.io";
import http from "http";
import express from "express";
import { handleGroupSocketEvents, groupSocketHelpers } from "./socket/groupSocketHandlers.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; // Store userId on socket for group handlers
    
    // Join personal room for notifications
    socket.join(`user_${userId}`);
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Initialize group socket handlers
  handleGroupSocketEvents(socket, io, userSocketMap);

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export group helper functions
export const { emitToGroup, emitToUser, notifyGroupMembers } = groupSocketHelpers;

export { io, app, server };