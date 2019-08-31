import socket from './index';
import Message from '../models/Message';
import User from '../models/User';

const io = socket.io();

io.on('connection', socket => {
    const changeUserStatus = async status => {
        const session = socket.handshake.session;
        if (session.passport && session.passport.user) {
            await User.updateOne({ _id: session.passport.user._id }, { active: status }).exec();

            io.emit('userStatusChanged', { userId: session.passport.user._id, status: status });
        }
    };

    changeUserStatus(true);
    
    socket.on('disconnect', () => changeUserStatus(false));
    socket.on('userLogout', () => changeUserStatus(false));

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