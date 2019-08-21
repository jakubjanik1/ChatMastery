<template>
    <div 
        class="conversation"
        :class="{ 'conversation--active' : isActive }"
        @click="emitConversationSelected"
        @mouseover="deleteIconColor = '#fff'"
        @mouseout="deleteIconColor = '#c3c4c4'"
        v-touch:swipe.left="showDeleteButton"
        v-touch:swipe.right="hideDeleteButton"
    >
        <div 
            class="conversation__wrapper" 
            :class="{ 'conversation__wrapper--moved-left' : deleteIconVisible }"
        >
            <div class="conversation__profile">
                <img class="conversation__picture" :src="avatar">
            </div>

            <div class="conversation__receiver">{{ receiver }}</div>
            <div class="conversation__last-message">{{ lastMessage }}</div>
            

            <div class="conversation__date">{{ date }}</div>
            <div class="conversation__unread-messages" v-show="unreadMessages">{{ unreadMessages }}</div>
        </div>

        <delete-icon class="conversation__delete" v-show="deleteIconVisible" :fillColor="deleteIconColor" />
    </div>
</template>

<script>
import { formatDate } from '@/helpers';
import EventBus from '@/services/EventBus';
import DeleteIcon from 'vue-material-design-icons/Delete';

export default {
    name: 'ConversationsItem',
    props: [ 'conversation' ],
    components: {
        DeleteIcon
    },
    data() {
        return {
            isActive: false,
            deleteIconVisible: false,
            deleteIconColor: '#c3c4c4'
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
            if (message.type == 'image') {
                return 'Image was sent';
            } else {
                return message.content.length > 25 ? `${message.content.slice(0, 25)}...` : message.content;
            }
        },
        receiver() {
            return this.conversation.members[0].name;
        },
        unreadMessages() {
            return this.conversation.unreadMessages;
        }, 
        avatar() {
            return this.conversation.members[0].avatar;
        },
        active() {
            return this.conversation.members[0].active;
        }
    },
    methods: {
        emitConversationSelected() {
            EventBus.$emit('conversationSelected', this.conversation);

            this.readMessages();

            this.isActive = true;
            this.deleteIconVisible = false;
        },
        readMessages() {
            const userId = this.$root.user._id;

            this.$socket.emit('readMessages', { conversationId: this.conversation._id, userId });
        },
        showDeleteButton() {
            this.deleteIconVisible = true;
        },
        hideDeleteButton() {
            this.deleteIconVisible = false;
        }
    },
    sockets: {
        messageAdded(message) {
            const currentConversationId = localStorage.getItem('conversationId');
            if (currentConversationId == message.conversationId && message.conversationId == this.conversation._id) {
                this.readMessages();
            }
        },
        userStatusChanged({ userId, status }) {
            if (userId == this.conversation.members[0]._id) {
                this.conversation.members[0].active = status;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .conversation {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f9f9f9;

        &:hover, &--active {
            background: #009ef7;
            transition: .3s ease-in-out;
            border-radius: 2px;

            .conversation__unread-messages {
                background: #fff;
                color: #009ef7;
            }

        }

        &:hover *, &--active * * {
            color: #fff !important;
        }

        &__delete {
            margin-left: 16px;
            transition: .3s ease-in-out;

            @media (min-width: 900px) {
                display: none;
            }
        }

        &__wrapper {
            transition: .3s ease-in-out;
            padding: 14px 20px;
            display: grid;
            width: 100%;
            grid-template-columns: 70px auto auto;
            grid-template-rows: 25px 25px;
            grid-template-areas: "picture receiver date"
                                "picture last-message unread-messages";

            @media (max-width: 900px) {     
                &--moved-left {
                    margin-left: -70px;
                }
            }

            & > * {
                display: flex;
                align-items: center;
            }

            @media (max-width: 900px) {
                width: calc(100vw - (40px));
            }
        }
            
        &__profile {
            width: 50px;
            height: 50px;
            position: relative;
            
            &--active::after {
                content: '';
                position: absolute;
                right: 1px;
                bottom: 1px;
                width: 12px;
                height: 12px;
                background: #2ecd8a;
                border-radius: 50%;
                border: 2px solid #fff;
            }
        }

        &__picture {
            width: inherit;
            height: inherit;
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
            word-break: break-all;
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
    }
</style>
