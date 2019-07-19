let io = null;

exports.init = server => io = require('socket.io')(server);

exports.io = () => io;