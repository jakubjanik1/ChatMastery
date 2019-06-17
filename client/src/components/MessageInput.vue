<template>
    <div class="message-input">
        <input 
            class="message-input__input" 
            placeholder="Type a message..." 
            v-model="body"
            spellcheck="false">

        <button 
            class="message-input__button" 
            :disabled="isEmpty" 
            @click="addMessage"
        >
            SEND
        </button>
    </div>
</template>

<script>
import ChatService from '@/services/ChatService';

export default {
    name: 'MessageInput',
    data() {
        return {
            body: ''
        };
    },
    methods: {
        async addMessage() {
            const conversationId = localStorage.getItem('conversationId');
            const userId = localStorage.getItem('userId');

            await ChatService.storeMessage({
                'body': this.body,
                'conversationId': conversationId,
                'author': userId
            });

            this.body = '';
        }
    },
    computed: {
         isEmpty() {
            return this.body.trim() == '';
        }
    }
}
</script>

<style lang="scss" scoped>
    .message-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px;
        height: 55px;
        background: #fafafa;
        border-top: 2px solid #f2f2f2;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 361px;

        &__input {
            color: #292929;
            margin-right: 32px;
            padding: 0;
            width: 100%;
            height: 100%;
            background: inherit;

            &:focus {
                outline: 0;
            }

            &::placeholder {
                font-size: 14px;
                font-weight: 500;
                color: #292929;
            }
        }

        &__button {
            color: #2ca9f8;
            background: transparent;

            &:hover {
                color: #0393f7;
                cursor: pointer;
            }
        }

        & * {
            font-family: inherit;
            font-size: 14px;
            font-weight: 600;
            border: 0;
        }
    }
</style>