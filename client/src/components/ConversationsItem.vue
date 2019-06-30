<template>
    <div class="conversation" :class="{ 'conversation--active' : isActive }" @click="emitConversationSelected">
        <img class="conversation__picture" src="@/assets/profile.jpg">
        <div class="conversation__receiver">{{ receiver }}</div>
        <div class="conversation__last-message">{{ lastMessage }}</div>

        <div class="conversation__date">{{ date }}</div>
        <div class="conversation__unread-messages" v-show="unreadMessages">{{ unreadMessages }}</div>
    </div>
</template>

<script>
import { formatDate } from '@/helpers';
import EventBus from '@/services/EventBus';

export default {
    name: 'ConversationsItem',
    props: [ 'conversation' ],
    data() {
        return {
            isActive: false
        };
    },
    mounted() {
        EventBus.$on('conversationSelected', () => this.isActive = false);

        EventBus.$on('newConversation', ({ _id: userId }) => {
            this.isActive = false;

            const conversationAlreadyExists = (this.conversation.members[0]._id == userId);
            if (conversationAlreadyExists) {
                this.emitConversationSelected();
            }
        });

        EventBus.$on('returnToConversations', () => this.isActive = false);
    },
    computed: {
        date() {
            return formatDate(this.conversation.lastMessage.createdAt);
        },
        lastMessage() {
            const message = this.conversation.lastMessage.body;
            return message.length > 30 ? `${message.slice(0, 24)}...` : message;
        },
        receiver() {
            return this.conversation.members[0].name;
        },
        unreadMessages() {
            return this.conversation.unreadMessages;
        }
    },
    methods: {
        emitConversationSelected() {
            EventBus.$emit('conversationSelected', this.conversation);

            this.readMessages();

            this.isActive = true;
        },
        readMessages() {
            const userId = localStorage.getItem('userId');

            this.$socket.emit('readMessages', { conversationId: this.conversation._id, userId });
        }
    },
    sockets: {
        messageAdded(message) {
            const currentConversationId = localStorage.getItem('conversationId');
            if (currentConversationId == message.conversationId && message.conversationId == this.conversation._id) {
                this.readMessages();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .conversation {
        border-bottom: 1px solid #f9f9f9;
        padding: 14px 20px;
        display: grid;
        grid-template-columns: 70px auto auto;
        grid-template-rows: 25px 25px;
        grid-template-areas: "picture receiver date"
                             "picture last-message unread-messages";

        &__picture {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            grid-area: picture;
        }

        &__receiver {
            color: #292929;
            font-weight: 600;
            grid-area: receiver;
        }

        &__last-message {
            grid-area: last-message;
            font-size: 13px;
            color: #9e9e9e;
        }

        &__date {
            grid-area: date;
            justify-self: right;
            font-size: 12px;
            color: #9e9e9e;
        }

        &__unread-messages {
            grid-area: unread-messages;
            background: #009ef7;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            border-radius: 50%;
            height: 16px;
            min-width: 16px;
            justify-self: right;
            align-self: center;
            justify-content: center;
            padding: 2px;
        }

         &:hover, &--active {
            background: #009ef7;
            cursor: pointer;
            border-radius: 2px;
            transition: .3s ease-in-out;

            .conversation__unread-messages {
                background: #fff;
                color: #009ef7;
            }
        }

        &:hover *, &--active * {
            color: #fff;
        }

        & > * {
            display: flex;
            align-items: center;
        }

        @media (max-width: 900px) {
            width: calc(100vw - (40px));
        }
    }
</style>
