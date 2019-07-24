const app = require('./app');
const server = require('http').createServer(app);
const io = require('./socket').init(server);

process.on('SIGTERM', () => io.close());

const sharedSession = require('express-socket.io-session');
io.use(sharedSession(app.get('session'), { autoSave: true }));

require('./socket/events');

server.listen(process.env.PORT || 8080, () => console.log('Server listening...'));