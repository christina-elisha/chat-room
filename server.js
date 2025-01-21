// server.js
const express = require('express');
const WebSocket = require('ws');

// Create an Express app
const app = express();
const port = 3000;

// Serve the static files (HTML, JS, CSS)
app.use(express.static('public'));

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // Broadcast message to all connected clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all clients except the sender
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle WebSocket disconnection
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

