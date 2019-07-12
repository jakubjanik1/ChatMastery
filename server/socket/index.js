const app = require('../app');
const server = require('http').createServer(app);

const io = require('socket.io')(server);
server.listen(8888);

const Message = require('../models/Message');

io.on('connection', socket => {

    socket.on('readMessages', ({ conversationId, userId }) => {
        Message.updateMany({
            $and: [
                    { conversationId: conversationId },
                    { author: { $ne: userId } }
                ]
            },
            { read: true }
        ).exec();
    });
})

module.exports = io;