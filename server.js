const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const logsRoutes = require('./routes/logs');
const profileRoutes = require('./routes/profile');
const { initializeWebSocket } = require('./webSocketServer'); // Import WebSocket initializer

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST',             
    allowedHeaders: 'Content-Type,Authorization', 
}));

app.use(express.json());

// Existing route handlers
app.use('/api', profileRoutes);
app.use('/api', logsRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Initialize WebSocket server
initializeWebSocket(server);
