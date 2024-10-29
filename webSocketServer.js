// webSocketServer.js
const WebSocket = require('ws');

let wss;

function initializeWebSocket(server) {
    wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
        console.log('New client connected');
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

function getWebSocketServer() {
    return wss;
}

module.exports = { initializeWebSocket, getWebSocketServer };
