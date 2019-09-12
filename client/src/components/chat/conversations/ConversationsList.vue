<template>
    <div class="conversations">
        <loading-circle :loading="isLoading" />

        <vue-scroll v-if="! isLoading && ! isEmpty">
            <conversations-item 
                :key="conversation._id" 
                v-for="conversation in conversations"
                :conversation="conversation" 
            />
        </vue-scroll>

        <div class="conversations--empty" v-else-if="isEmpty">
            <message-icon :size="80" fillColor="#009ef7" />
            <div class="conversations__info">No conversations, yet</div>
            <div class="conversations__more">
                <div>No conversations in your inbox yet!</div>
                <div>Start chatting with your friends</div>
            </div>
        </div>

        <div class="conversations__create-group">Create group</div>
    </div>
</template>

<script>
import ConversationsItem from './ConversationsItem';
import ChatService from '@/services/ChatService';
import EventBus from '@/helpers/EventBus';
import LoadingCircle from '@/components/common/LoadingCircle';
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
            const userId = this.$root.user._id;

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
        },
        conversationDeleted(conversationId) {
            this.conversations = this.conversations.filter(conversation => conversation._id != conversationId);

            EventBus.$emit('returnToConversations');
        }
    }
}
</script>

<style lang="scss" scoped>
    .conversations {
        grid-area: conversations-list;
        height: calc((var(--vh, 1vh) * 100) - (64px));
        border-right: 2px solid var(--primary-border-color);
        border-top: 2px solid var(--primary-border-color);
        position: relative;
        background: var(--primary-background-color);

        &--empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
        }

        &__info {
            font-weight: 600;
            font-size: 14px;
            color: var(--primary-text-color);
        }

        &__more {
            font-size: 13px;
            color: #9e9e9e;
            padding: 10px 50px;
            text-align: center;
            line-height: 1.5em;
        }

        &__create-group {
            position: absolute;
            bottom: 16px;
            left: calc(50% - 78px);
            background: #009ef7;
            color: #fff;
            border-radius: 2px;
            padding: 10px 32px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0px 0px 21px 3px #403d3d45;

            &:hover {
                transition: 0.3s ease-in-out;
                background: darken(#009ef7, 5%);
            }
        }
        
        @media (max-width: 900px) {
            border-right: 0;
            height: calc((var(--vh, 1vh) * 100) - (160px));

            &__create-group {
                bottom: 24px;
            }
        }
    }
</style>