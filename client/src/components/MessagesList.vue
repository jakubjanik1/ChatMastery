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
        this.getMessages();

        this.$refs.scroll.scrollBy({
            dy: 1000000000000
        });
    },
    methods: {
        async getMessages() {
            const response = await ChatService.fetchMessages('5d01fcc506276e0d80b31a86');
            this.messages = response.data;
        }
    }
}
</script>

<style lang="scss" scoped>
    .messages {
        width: 100vw;
        height: 100vh;
    }
</style>
