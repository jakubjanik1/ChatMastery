<template>
    <div class="conversation-info">
        <return-icon 
            class="conversation-info__return"
            :size="38"
            fillColor="#c3c4c4"
            @click="emitReturnToConversations"
            title=""
        />

        <div class="conversation-info__name">{{ name }}</div>
        <div class="conversation-info__active" v-show="active"></div>
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
            userId: null,
            name: '',
            active: false
        }
    },
    created() {
        EventBus.$on('conversationSelected', (conversation) => {
            if (conversation.group) {
                this.name = conversation.groupName;
                this.active = conversation.members.filter(member => member.active).length > 0;
            } else {
                this.name = conversation.members[0].name;
                this.active = conversation.members[0].active;
                this.userId = conversation.members[0]._id;
            } 
        });

        EventBus.$on('newConversation', user => {
            this.name = user.name;
            this.active = user.active;
        });
    },
    methods: {
        emitReturnToConversations() {
            EventBus.$emit('returnToConversations');
        }
    },
    sockets: {
        userStatusChanged({ userId, status }) {
            if (userId == this.userId) {
                this.active = status;
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

        &__name {
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
