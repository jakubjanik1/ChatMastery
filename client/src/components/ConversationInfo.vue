<template>
    <div class="conversation-info">
        <return-icon 
            class="conversation-info__return"
            :size="38"
            fillColor="#c3c4c4"
            @click="emitReturnToConversations"
        >
            BACK
        </return-icon>

        <div class="conversation-info__receiver">{{ receiver }}</div>
    </div>
</template>

<script>
import EventBus from '@/services/EventBus';
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
            this.receiver = receiver[0].name;
        });

        EventBus.$on('newConversation', ({ name }) => {
            this.receiver = name;
        });
    },
    methods: {
        emitReturnToConversations() {
            EventBus.$emit('returnToConversations');
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

        &__return {
            height: 38px;
            position: absolute;
            left: 2px;

            &:hover {
                cursor: pointer;
            }
        }

        &__receiver {
            color: #292929;
            font-weight: 600;
        }
    }

    @media (min-width: 900px) {
        .conversation-info {
            display: none;
        }
    }
</style>
