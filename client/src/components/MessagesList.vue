<template>
    <div class="messages">
        <loading-circle :loading="isLoading"></loading-circle>

        <vue-scroll ref="scroll" v-show="! isLoading">
            <messages-receiver-info></messages-receiver-info>

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
import MessagesReceiverInfo from './MessagesReceiverInfo';
import LoadingCircle from './LoadingCircle';

export default {
    name: 'MessagesList',
    components: {
        MessagesItem,
        MessagesReceiverInfo,
        LoadingCircle
    },
    data() {
        return {
            messages: [],
            isLoading: false
        };
    },
    mounted() {
        localStorage.setItem('conversationId', '');

        EventBus.$on('conversationSelected', async ({ _id: id }) => {
            localStorage.setItem('conversationId', id);

            await this.getMessages(id);

            this.scrollDown();
        });

        EventBus.$on('newConversation', () => {
            localStorage.setItem('conversationId', '');
            
            this.messages = [];
        });

        EventBus.$on('messageInputFocus', () => {
            this.scrollDown();
        });
    },
    methods: {
        async getMessages(conversationId) {
            this.isLoading = true;

            const response = await ChatService.fetchMessages(conversationId);
            this.messages = response.data;    

            this.isLoading = false;
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
        grid-area: messages-list;
        background: #f6f6f6;
        width: 100%;
        height: calc((var(--vh, 1vh) * 100) - (121px));
        border-top: 2px solid #f2f2f2;
        position: relative;

        @media (max-width: 900px) {
            height: calc((var(--vh, 1vh) * 100) - (94px));
        }
    }
</style>
