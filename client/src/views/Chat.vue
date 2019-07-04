<template>
    <div class="chat" :class="showChat ? 'chat--messages' : 'chat--conversations'">
        <chat-header v-show="! showChat || isLarge" />
        <conversations-list v-show="! showChat || isLarge" />
        <chat-box v-show="showChat || isLarge" />
  </div>
</template>

<script>
import ChatHeader from '@/components/ChatHeader';
import ConversationsList from "@/components/ConversationsList";
import ChatBox from '@/components/ChatBox';
import EventBus from '@/services/EventBus';

export default {
    name: 'Chat',
    components: {
        ChatHeader,
        ConversationsList,
        ChatBox
    },
    data() {
        return {
            showChat: false,
            isLarge: true
        }
    },
    created() {
        EventBus.$on('conversationSelected', () => this.showChat = true);
        EventBus.$on('returnToConversations', () => this.showChat = false);
        EventBus.$on('newConversation', () => this.showChat = true);

        this.checkScreenWidth();
        window.onresize = this.checkScreenWidth;
    },
    methods: {
        checkScreenWidth() {
            if (window.innerWidth < 900) {
                this.isLarge = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .chat {
        display: grid;
        grid-template-columns: 360px auto;
        grid-template-rows: 64px auto 64px;
        grid-template-areas: "header header"
                             "conversations-list chat-box"
                             "conversations-list chat-box";
    }

    @media (max-width: 900px) {
        .chat {
            &--conversations {
                grid-template-columns: auto;
                grid-template-rows: auto auto;
                grid-template-areas: "header"
                                     "conversations-list";
            }

            &--messages {
                grid-template-columns: auto;
                grid-template-rows: auto;
                grid-template-areas: "chat-box";            
            }
        }      
    }
</style>
