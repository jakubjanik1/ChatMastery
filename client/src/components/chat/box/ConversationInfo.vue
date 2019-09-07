<template>
    <div class="conversation-info">
        <return-icon 
            class="conversation-info__return"
            :size="38"
            fillColor="#c3c4c4"
            @click="emitReturnToConversations"
        />

        <div class="conversation-info__receiver">{{ receiver.name }}</div>
        <div class="conversation-info__active" v-show="receiver.active"></div>
    </div>
</template>

<script>
import EventBus from '@/helpers/EventBus';
import ReturnIcon from 'vue-material-design-icons/ChevronLeft';

export default {
    name: 'ConversationInfo',
    components: {
        ReturnIcon
    },
    data() {
        return {
            receiver: ''
        }
    },
    created() {
        EventBus.$on('conversationSelected', ({ members: receiver }) => {
            this.receiver = receiver[0];
        });

        EventBus.$on('newConversation', user => {
            this.receiver = user;
        });
    },
    methods: {
        emitReturnToConversations() {
            EventBus.$emit('returnToConversations');
        }
    },
    sockets: {
        userStatusChanged({ userId, status }) {
            if (userId == this.receiver._id) {
                this.receiver.active = status;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .conversation-info {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 40px;
        background: var(--primary-background-color);

        &__return {
            height: 38px;
            position: absolute;
            left: 2px;

            &:hover {
                cursor: pointer;
            }
        }

        &__receiver {
            color: var(--primary-text-color);
            font-weight: 600;
        }

        &__active {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #2ecd8a;
            margin-left: 8px;
        }
    }

    @media (min-width: 900px) {
        .conversation-info {
            display: none;
        }
    }
</style>
