<template>
    <div class="messages">
        <vue-scroll ref="scroll">
            <messages-item 
                :key="message._id"
                v-for="message in messages"
                :message="message"
            >

            </messages-item>
        </vue-scroll>
    </div>
</template>

<script>
import ChatService from '@/services/ChatService';
import EventBus from '@/services/EventBus';
import MessagesItem from './MessagesItem';

export default {
    name: 'MessagesList',
    components: {
        MessagesItem
    },
    data() {
        return {
            messages: []
        };
    },
    mounted() {
        localStorage.setItem('conversationId', '');

        EventBus.$on('conversationSelected', id => {
            localStorage.setItem('conversationId', id);

            this.getMessages(id);

            this.scrollDown();
        });

        EventBus.$on('newConversation', () => {
            localStorage.setItem('conversationId', '');
            
            this.messages = [];
        });
    },
    methods: {
        async getMessages(conversationId) {
            const response = await ChatService.fetchMessages(conversationId);
            this.messages = response.data;
        },
        scrollDown() {
            this.$refs.scroll.scrollBy({
                dy: 1000000000000
            });
        }
    },
    sockets: {
        messageAdded(message) {
            const conversationId = localStorage.getItem('conversationId');
            
            if (message.conversationId == conversationId) {
                this.messages.push(message);
                this.scrollDown();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .messages {
        background: #f6f6f6;
        width: 100%;
        height: calc(100vh - (121px));
        border-top: 2px solid #f2f2f2;
    }
</style>
