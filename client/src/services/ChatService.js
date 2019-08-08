import Api from '@/services/Api';

export default {
    fetchConversations(userId) {
        return Api().get(`/chat/conversations/${userId}`);
    },

    fetchMessages(conversationId, part) {
        return Api().get(`/chat/conversation/${conversationId}/messages/part/${part}`);
    },

    storeMessage(message) {
        return Api().post(`/chat/conversation/message`, message);
    },

    storeConversation(conversation) {
        return Api().post('/chat/conversation', conversation);
    }
}