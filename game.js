const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const socket = io();  // Connect to the server

// Player data
let player = { x: 100, y: 100, color: 'blue' };

// Move player with arrow keys
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') player.y -= 5;
  if (e.key === 'ArrowDown') player.y += 5;
  if (e.key === 'ArrowLeft') player.x -= 5;
  if (e.key === 'ArrowRight') player.x += 5;
  
  // Send player position to the server
  socket.emit('move', player);
});

// Receive the updated game state from the server
socket.on('state', (players) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Render all players
  for (const id in players) {
    const p = players[id];
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 20, 20);  // Simple square player
  }
});
