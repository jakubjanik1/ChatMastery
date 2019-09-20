import mongoose, { Schema } from 'mongoose';

const ConversationSchema = new Schema({
    members: [{
        type: String,
        ref: 'User'
    }],
    group: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String
    },
    groupImage: {
        type: String
    }
});

export default mongoose.model('Conversation', ConversationSchema);