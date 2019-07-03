<template>
    <div class="message-input" :class="{ 'message-input--invisible' : !isVisible }">
        <div class="message-input__scroll" v-bar>
             <textarea 
                class="message-input__input" 
                placeholder="Type a message..."
                spellcheck="false"
                v-model="body"
                :class="{ 'message-input__input--empty': !isMultiline || isEmpty }">

            </textarea>
        </div>

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
import EventBus from '@/services/EventBus';

export default {
    name: 'MessageInput',
    data() {
        return {
            body: '',
            isVisible: false
        };
    },
    created() {
        EventBus.$on('conversationSelected', this.setup);
        EventBus.$on('newConversation', this.setup);
    },
    methods: {
        async addMessage() {
            const userId = localStorage.getItem('userId');
            const conversationId = await this.getConversationId();
            
            localStorage.setItem('conversationId', conversationId.data);
            
            await ChatService.storeMessage({
                'body': this.body,
                'conversationId': conversationId.data,
                'author': userId
            });

            this.body = '';
        },
        async getConversationId() {
            const conversationId = localStorage.getItem('conversationId');
            if (conversationId) {
                return { data: conversationId };
            } else {
                return await ChatService.storeConversation({
                    'members': [
                        localStorage.getItem('userId'),
                        localStorage.getItem('receiverUserId')
                    ]
                });
            }
        },
        setup() {
            this.isVisible = true;
            this.body = '';
        }
    },
    computed: {
         isEmpty() {
            return this.body.trim() == '';
        },
        isMultiline() {
            return this.body.includes('\n');
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
        grid-area: message-input;

        &--invisible {
            border-top-color: #f6f6f6;
            background: #f6f6f6;

            & > * {
                display: none;
            }
        }

        &__scroll {
            width: 100%;
            margin-right: 32px;
        }

        &__input {
            color: #292929;
            padding: 0;
            background: inherit;
            height: 100%;
            padding: 0;
            resize: none;

            &:focus {
                outline: 0;
            }

            &::placeholder {
                font-size: 14px;
                font-weight: 500;
                color: #292929;
            }

            &--empty {
                padding-top: 17px;
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

        @media (max-width: 900px) {
            padding: 0 12px 0 18px;
            height: 50px;

            &__input::placeholder {
                font-size: 13px;
            }

            & * {
                font-size: 13px;
            }
        }
    }
</style>