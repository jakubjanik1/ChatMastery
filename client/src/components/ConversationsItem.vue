<template>
    <div class="conversation">
        <img class="conversation__picture" src="@/assets/profile.jpg">
        <div class="conversation__receiver">{{ receiver }}</div>
        <div class="conversation__last-message">{{ lastMessage }}</div>
        <div class="conversation__date">{{ date }}</div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'ConversationsItem',
    props: [ 'conversation' ],
    computed: {
        date() {
            const date = this.conversation.lastMessage.createdAt;
            return moment(date).fromNow();
        },
        lastMessage() {
            return this.conversation.lastMessage.body;
        },
        receiver() {
            return this.conversation.members[0].name;
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

        &:hover {
            background: #009ef7;
            cursor: pointer;
            border-radius: 2px;
            transition: .3s ease-in-out;
        }

        &:hover * {
            color: #fff;
        }

        &__picture {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            grid-area: picture;
        }

        &__receiver {
            color: #000;
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

        & > * {
            display: flex;
            align-items: center;
        }
    }
</style>
