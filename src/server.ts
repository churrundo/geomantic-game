import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Allow CORS for all routes
app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('gameAction', (action) => {
    console.log('Received action:', action);
    io.emit('gameAction', action);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
