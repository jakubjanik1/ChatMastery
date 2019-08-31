import mongoose, { Schema } from 'mongoose';

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
        type: String,
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

export default mongoose.model('Message', MessageSchema);