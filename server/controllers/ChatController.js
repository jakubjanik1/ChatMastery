const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

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
                    .select('-_id body createdAt')
                    .then(message => {
                        fullConversations.push({
                             ...conversation._doc, 
                             lastMessage: message[0] 
                        });

                        if (conversations.length == fullConversations.length) {
                            res.json(fullConversations);
                        }
                    })
            })
        });
};