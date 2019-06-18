const app = require('../app');
const server = require('http').createServer(app);

const io = require('socket.io')(server);
server.listen(8888);

module.exports = io;