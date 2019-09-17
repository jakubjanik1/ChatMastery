import Api from '@/services/Api';
const api = Api('chat');

export function fetchConversations(userId) {
    return api.get(`/conversations/${userId}`);
}

export function fetchMessages(conversationId, part) {
    return api.get(`/conversation/${conversationId}/messages/part/${part}`);
}

export function storeMessage(message) {
    return api.post(`/conversation/message`, message);
}

export function storeConversation(conversation) {
    return api.post('/conversation', conversation);
}

export function deleteConversation(conversationId) {
    return api.delete(`/conversation/${ conversationId }`);
}