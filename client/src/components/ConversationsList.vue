<template>
    <div class="conversations">
        <loading-circle :loading="isLoading"></loading-circle>

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
import LoadingCircle from './LoadingCircle';

export default {
    name: 'ConversationsList',
    components: {
        ConversationsItem,
        LoadingCircle
    },
    data() {
        return {
            conversations: [],
            isLoading: false
        };
    },
    async created() {
        EventBus.$on('conversationSelected', () => this.getConversations());

        this.isLoading = true;
        await this.getConversations();
        this.isLoading = false;
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
        height: calc((var(--vh, 1vh) * 100) - (64px));
        min-width: 360px - 2px;
        border-radius: 2px;
        border-right: 2px solid #f2f2f2;
        position: relative;

        @media (max-width: 900px) {
            border-right: 0;
        }
    }
</style>
