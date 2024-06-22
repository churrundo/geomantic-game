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

app.use(cors({ origin: 'http://localhost:3000' })); // Allow CORS for all routes

const PORT = process.env.PORT || 4000;

function generateRoomCode() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 6;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const rooms = new Map(); // This will hold the room IDs and their player counts

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Attempt to join the first available room or create a new one
  let assignedRoomEntry = [...rooms.entries()].find(([key, value]) => value < 2);
  
  // If no room is available or exists, create a new room
  if (!assignedRoomEntry) {
    const newRoomId = generateRoomCode();
    assignedRoomEntry = [newRoomId, 0]; // Create a new room with 0 participants
    rooms.set(newRoomId, 1); // Set initial participant count
    console.log(`New room created: ${newRoomId}`);
  } else {
    // Increment the number of players in the existing room
    rooms.set(assignedRoomEntry[0], assignedRoomEntry[1] + 1);
  }

  const [assignedRoomId, _] = assignedRoomEntry; // Destructure to get the room ID
  socket.join(assignedRoomId);
  console.log(`Client ${socket.id} assigned to room ${assignedRoomId}`);

  socket.emit('roomAssigned', assignedRoomId); // Inform the client of their room

  socket.on('gameAction', (action) => {
    // Handle game actions and broadcast to the room
    console.log(`Action received from ${socket.id} in room ${assignedRoomId}:`, action);
    socket.to(assignedRoomId).emit('gameAction', action);
  });

  socket.on('disconnecting', () => {
    // When disconnecting, decrement the player count or delete the room if empty
    const playerCount = rooms.get(assignedRoomId) - 1;
    if (playerCount > 0) {
      rooms.set(assignedRoomId, playerCount);
    } else {
      rooms.delete(assignedRoomId);
    }
    console.log(`Client ${socket.id} disconnecting from room ${assignedRoomId}`);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
