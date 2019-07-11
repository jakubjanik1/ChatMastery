const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    members: [{
        type: String,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);