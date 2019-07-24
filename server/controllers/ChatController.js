const User = require('../models/User');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const cloudinary = require('../config/cloudinary');

exports.getConversations = async (req, res) => {
    const conversations = await Conversation.find({ members: req.params.userId })
        .populate({ 
            path: 'members', 
            select: 'name avatar active', 
            match: { _id: { $ne: req.params.userId }}
        });

        if (! conversations.length) return res.json([]);
        
        const fullConversations = [];
        conversations.forEach(async conversation => {
            const message = await Message.find({ conversationId: conversation._id })
                .sort('-createdAt')
                .limit(1)
                .select('body createdAt');

            const result = await Message.aggregate([
                {
                    $match: { 
                        $and: [
                            { read: false },
                            { author: { $ne: req.params.userId } },
                            { conversationId: conversation._id }
                        ]
                    }
                }, {
                    $count: 'unreadMessages'
                }
            ]);
            
            const unreadMessages = result.length ? result[0].unreadMessages : 0;

            fullConversations.push({
                ...conversation._doc, 
                unreadMessages,
                lastMessage: message[0] 
            });

            if (conversations.length == fullConversations.length) {
                fullConversations.sort((x, y) => x.lastMessage.createdAt < y.lastMessage.createdAt);
                return res.json(fullConversations);
            }
        })

        
};

exports.getMessages = (req, res) => {
    Message.find({ conversationId: req.params.id })
        .populate('author','name avatar')
        .sort('createdAt')
        .select('-conversationId')
        .then(messages => res.json(messages));
};

exports.storeMessage = (req, res) => {
    const message = new Message(req.body);

    message.save()
        .then(() => {
            Message.find({ _id: message._id })
                .populate('author','name avatar')
                .then(messages => require('../socket').io().emit('messageAdded', messages[0]));
                
            res.json('Success');
        });
};

exports.storeConversation = (req, res) => {
    const conversation = new Conversation(req.body);

    conversation.save()
        .then(response => res.send(response._id));
}

exports.storeMessageImage = async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(
        req.files.image.path,
        { folder: 'chatmastery/messages' }
    );

    return res.json({ url: result.url });
}