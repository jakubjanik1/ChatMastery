import Api from '@/services/Api';

export default {
    fetchConversations(userId) {
        return Api().get(`/chat/conversations/${userId}`);
    },

    fetchMessages(conversationId) {
        return Api().get(`/chat/conversation/${conversationId}/messages`);
    },

    storeMessage(message) {
        return Api().post(`/chat/conversation/message`, message);
    }
}