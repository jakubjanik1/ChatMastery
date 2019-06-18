const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const io = require('../socket');

exports.getConversations = (req, res) => {
    Conversation.find({ members: req.params.userId })
        .populate({ 
            path: 'members', 
            select: 'name', 
            match: { _id: { $ne: req.params.userId }}
        })
        .then(conversations => {
            const fullConversations = [];

            conversations.forEach(conversation => {
                Message.find({ conversationId: conversation._id })
                    .sort('-createdAt')
                    .limit(1)
                    .select('body createdAt')
                    .then(message => {
                        fullConversations.push({
                             ...conversation._doc, 
                             lastMessage: message[0] 
                        });

                        if (conversations.length == fullConversations.length) {
                            fullConversations.sort((x, y) => x.lastMessage.createdAt < y.lastMessage.createdAt);
                            res.json(fullConversations);
                        }
                    })
            })
        });
};

exports.getMessages = (req, res) => {
    Message.find({ conversationId: req.params.id })
        .populate('author','name')
        .sort('createdAt')
        .select('-conversationId')
        .then(messages => res.json(messages));
};

exports.storeMessage = (req, res) => {
    const message = new Message(req.body);

    message.save()
        .then(() => {
            io.emit('messageAdded', message);
            res.json('Success');
        });
};