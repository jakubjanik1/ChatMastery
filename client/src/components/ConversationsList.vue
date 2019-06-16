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
            const response = await ChatService.fetchConversations();
            this.conversations = response.data;
        }
    }
}
</script>

<style lang="scss" scoped>
    .conversations {
        height: 100vh;
        min-width: 360px;
        border-radius: 2px;
        border-right: 1px solid #f2f2f2;
    }
</style>
