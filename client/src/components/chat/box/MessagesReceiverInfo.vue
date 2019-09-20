<template>
    <div class="messages-receiver-info" v-if="loaded">
        <img class="messages-receiver-info__picture" :src="avatar">
        <div class="messages-receiver-info__name">{{ name }}</div>
    </div>
</template>

<script>
import EventBus from '@/helpers/EventBus';

export default {
    name: 'MessagesReceiverInfo',
    data() {
        return {
            loaded: null,
            name: '',
            avatar: ''
        }
    },
    mounted() {
        EventBus.$on('conversationSelected', conversation => {
            this.name = conversation.group ? conversation.groupName : conversation.members[0].name;
            this.avatar = conversation.group ? conversation.groupImage : conversation.members[0].avatar;
            this.loaded = true;
        });

        EventBus.$on('newConversation', ({ name, avatar }) => {
            this.name = name;
            this.avatar = avatar;

            this.loaded = true;
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
