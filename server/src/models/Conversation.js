import mongoose, { Schema } from 'mongoose';

const ConversationSchema = new Schema({
    members: [{
        type: String,
        ref: 'User'
    }],
    group: {
        name: String,
        image: String,
    }
});

export default mongoose.model('Conversation', ConversationSchema);