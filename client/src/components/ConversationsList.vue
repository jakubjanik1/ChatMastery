<template>
    <div class="conversations">
        <vue-scroll>
            <conversations-item 
                :key="conversation._id" 
                v-for="conversation in conversations"
                :conversation="conversation">

            </conversations-item>
        </vue-scroll>
    </div>
</template>

<script>
import ConversationsItem from './ConversationsItem';
import ChatService from '@/services/ChatService';
import EventBus from '@/services/EventBus';

export default {
    name: 'ConversationsList',
    components: {
        ConversationsItem
    },
    data() {
        return {
            conversations: []
        };
    },
    created() {
        EventBus.$on('conversationSelected', () => this.getConversations());

        this.getConversations();
    },
    methods: {
        async getConversations() {
            const userId = localStorage.getItem('userId');

            const response = await ChatService.fetchConversations(userId);
            this.conversations = response.data;
        }
    },
    sockets: {
        messageAdded(message) {
            this.getConversations();
        }
    }
}
</script>

<style lang="scss" scoped>
    .conversations {
        grid-area: conversations-list;
        height: calc(100vh - (64px));
        min-width: 360px - 2px;
        border-radius: 2px;
        border-right: 2px solid #f2f2f2;
    }
</style>
