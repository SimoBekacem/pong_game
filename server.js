const http = require('http');
const io = require('socket.io');

const app = require('./api');
const socket = require('./socket');

const httpServer = http.createServer(app);
const socketServer = io(httpServer);

const PORT = 3000;

httpServer.listen(PORT);
console.log(`We are listinning to the port: ${PORT}`);

socket.listen(socketServer);
