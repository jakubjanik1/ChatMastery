<template>
    <div class="conversation" :class="{ 'conversation--active' : isActive }" @click="emitConversationSelected">
        <img class="conversation__picture" src="@/assets/profile.jpg">
        <div class="conversation__receiver">{{ receiver }}</div>
        <div class="conversation__last-message">{{ lastMessage }}</div>
        <div class="conversation__date">{{ date }}</div>
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
    },
    computed: {
        date() {
            return formatDate(this.conversation.lastMessage.createdAt);
        },
        lastMessage() {
            const message = this.conversation.lastMessage.body;
            return message.length > 30 ? `${message.slice(0, 30)}...` : message;
        },
        receiver() {
            return this.conversation.members[0].name;
        }
    },
    methods: {
        emitConversationSelected() {
            EventBus.$emit('conversationSelected', this.conversation._id);
            this.isActive = true;
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
                             "picture last-message last-message";

        &:last-of-type {
            margin-bottom: 66px;
        }

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

         &:hover, &--active {
            background: #009ef7;
            cursor: pointer;
            border-radius: 2px;
            transition: .3s ease-in-out;
        }

        &:hover *, &--active * {
            color: #fff;
        }

        & > * {
            display: flex;
            align-items: center;
        }
    }
</style>
