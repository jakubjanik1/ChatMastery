const io = require('./index').io();
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
});