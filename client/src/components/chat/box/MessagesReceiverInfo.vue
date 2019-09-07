<template>
    <div class="messages-receiver-info" v-if="receiver">
        <img class="messages-receiver-info__picture" :src="receiver.avatar">
        <div class="messages-receiver-info__name">{{ receiver.name }}</div>
    </div>
</template>

<script>
import EventBus from '@/helpers/EventBus';

export default {
    name: 'MessagesReceiverInfo',
    data() {
        return {
            receiver: null
        }
    },
    mounted() {
        EventBus.$on('conversationSelected', conversation => {
            this.receiver = conversation.members[0];
        });

        EventBus.$on('newConversation', user => {
            this.receiver = user;
        });
    }
}
</script>

<style lang="scss" scoped>
    .messages-receiver-info {
        text-align: center;

        &__picture {
            margin-top: 32px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
        }

        &__name {
            margin-top: 6px;
            color: var(--primary-text-color);
            font-weight: 600;
        }

        @media (max-width: 900px) {
            &__picture {
                width: 105px;
                height: 105px;
            }
        }
    }
</style>
