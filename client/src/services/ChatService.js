import Api from '@/services/Api';
const api = Api('chat');

export default {
    fetchConversations(userId) {
        return api.get(`/conversations/${userId}`);
    },

    fetchMessages(conversationId, part) {
        return api.get(`/conversation/${conversationId}/messages/part/${part}`);
    },

    storeMessage(message) {
        return api.post(`/conversation/message`, message);
    },

    storeConversation(conversation) {
        return api.post('/conversation', conversation);
    },

    deleteConversation(conversationId) {
        return api.delete(`/conversation/${ conversationId }`);
    }
}