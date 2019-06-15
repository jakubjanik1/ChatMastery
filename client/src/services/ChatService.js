import Api from '@/services/Api';

export default {
    fetchConversations() {
        return Api().get('/chat/conversations/5cfd1455363b4aa323668add');
    }
}