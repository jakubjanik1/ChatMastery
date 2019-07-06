const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: {
            type: String,
            enum: [ 'text', 'image' ],
            required: true
         },
        content: {
            type: String,
            required: true 
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', MessageSchema);