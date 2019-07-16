<template>
    <div class="conversations">
        <loading-circle :loading="isLoading"></loading-circle>

        <vue-scroll v-if="! isLoading && ! isEmpty">
            <conversations-item 
                :key="conversation._id" 
                v-for="conversation in conversations"
                :conversation="conversation">

            </conversations-item>
        </vue-scroll>

        <div class="conversations--empty" v-else-if="isEmpty">
            <message-icon :size="80" fillColor="#009ef7"></message-icon>
            <div class="conversations__info">No conversations, yet</div>
            <div class="conversations__more">
                No conversations in your inbox yet!
                Start chatting with your friends
            </div>
        </div>
    </div>
</template>

<script>
import ConversationsItem from './ConversationsItem';
import ChatService from '@/services/ChatService';
import EventBus from '@/services/EventBus';
import LoadingCircle from './LoadingCircle';
import MessageIcon from 'vue-material-design-icons/MessageReplyText';

export default {
    name: 'ConversationsList',
    components: {
        ConversationsItem,
        LoadingCircle,
        MessageIcon
    },
    data() {
        return {
            conversations: [],
            isLoading: false,
            isEmpty: false
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
            const userId = this.$store.user._id;

            const response = await ChatService.fetchConversations(userId);
            this.conversations = response.data;
        }
    },
    watch: {
        conversations() {
            this.isEmpty = (this.conversations.length == 0);
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
        border-top: 2px solid #f2f2f2;
        position: relative;
        background: #fff;

        &--empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
        }

        &__info {
            font-weight: 600;
            font-size: 14px;
            color: #292929;
        }

        &__more {
            font-size: 13px;
            color: #9e9e9e;
            padding: 10px 50px;
            text-align: center;
            line-height: 1.5em;
        }
        
        @media (max-width: 900px) {
            border-right: 0;
            height: calc((var(--vh, 1vh) * 100) - (146px));
        }
    }
</style>