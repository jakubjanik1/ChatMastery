<template>
    <div class="conversations">
        <vue-scroll :ops="scrollOptions">
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
import VueScroll from 'vuescroll';

export default {
    name: 'ConversationsList',
    components: {
        ConversationsItem,
        VueScroll
    },
    data() {
        return {
            conversations: [],
            scrollOptions: {
                bar: {
                    size: 0
                }
            }
        };
    },
    created() {
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
            this.conversations.forEach(conversation => {
                const conversationId = localStorage.getItem('conversationId');

                if (conversation._id == message.conversationId) {
                    conversation.lastMessage.body = message.body;
                    conversation.lastMessage.createdAt = message.createdAt;

                    return;
                }
            });

            this.conversations.sort((a, b) => 
                Date.parse(b.lastMessage.createdAt) - Date.parse(a.lastMessage.createdAt)
            );
        }
    }
}
</script>

<style lang="scss" scoped>
    .conversations {
        height: 100vh;
        min-width: 360px;
        border-radius: 2px;
        border-right: 2px solid #f2f2f2;
    }
</style>
