import mongoose, { Schema } from 'mongoose';

const ConversationSchema = new Schema({
    members: [{
        type: String,
        ref: 'User'
    }]
});

export default mongoose.model('Conversation', ConversationSchema);