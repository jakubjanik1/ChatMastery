import '@babel/polyfill';
import app from './app';
import http from 'http';
import socket from './socket/index';
import sharedSession from 'express-socket.io-session';

const server = http.createServer(app);
const io = socket.init(server);

process.on('SIGTERM', () => io.close());

io.use(sharedSession(app.get('session'), { autoSave: true }));

require('./socket/events');

server.listen(process.env.PORT || 8080, () => console.log('Server listening...'));