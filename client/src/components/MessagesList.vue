<template>
    <div class="messages">
        <vue-scroll :ops="scrollOptions" ref="scroll">
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
import VueScroll from 'vuescroll';

export default {
    name: 'MessagesList',
    components: {
        MessagesItem,
        VueScroll
    },
    data() {
        return {
            messages: [],
            scrollOptions: {
                bar: {
                    size: 0
                }
            }
        };
    },
    mounted() {
        EventBus.$on('conversationChanged', (id) => {
            localStorage.setItem('conversationId', id);

            this.getMessages(id);

            this.$refs.scroll.scrollBy({
                dy: 1000000000000
            });
        });
    },
    methods: {
        async getMessages(conversationId) {
            const response = await ChatService.fetchMessages(conversationId);
            this.messages = response.data;
        }
    }
}
</script>

<style lang="scss" scoped>
    .messages {
        background: #f6f6f6;
        width: 100%;
        height: 100vh;
    }
</style>
