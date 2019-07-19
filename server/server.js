const app = require('./app');
const server = require('http').createServer(app);
const io = require('./socket').init(server);

require('./socket/events');

server.listen(8080, () => console.log('Server listening...'));