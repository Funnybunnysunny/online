const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let players = {};

io.on('connection', (socket) => {
  // Add new player
  players[socket.id] = { x: 100, y: 100, color: 'blue' };
  
  // Handle player movement
  socket.on('move', (data) => {
    players[socket.id] = data;
    
    // Broadcast updated state to all players
    io.emit('state', players);
  });
  
  // Remove player on disconnect
  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('state', players);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
