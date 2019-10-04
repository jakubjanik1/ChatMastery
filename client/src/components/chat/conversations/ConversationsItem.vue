<template>
    <div 
        class="conversation"
        :class="{ 'conversation--active' : isActive }"
        @click="emitConversationSelected"
        @contextmenu="$emit('contextmenu', $event)"
        v-touch:swipe.left="showDeleteButton"
        v-touch:swipe.right="hideDeleteButton"
    >
        <div 
            class="conversation__wrapper" 
            :class="{ 'conversation__wrapper--moved-left' : deleteIconVisible }"
        >
            <div 
                class="conversation__profile"
                :class="{ 'conversation__profile--active' : active }"
            >
                <img class="conversation__picture" :src="avatar">
            </div>

            <div class="conversation__name">{{ name }}</div>
            <div class="conversation__last-message">{{ lastMessage }}</div>
            

            <div class="conversation__date">{{ date }}</div>
            <div class="conversation__unread-messages" v-show="unreadMessages">{{ unreadMessages }}</div>
        </div>

        <delete-icon 
            class="conversation__delete" 
            v-show="deleteIconVisible" 
            fillColor="#c3c4c4" 
            title=""
            @click="deleteConversation"
        />
    </div>
</template>

<script>
import { formatDate } from '@/helpers';
import EventBus from '@/helpers/EventBus';
import DeleteIcon from 'vue-material-design-icons/Delete';
import { deleteConversation } from '@/services/ChatService';

export default {
    name: 'ConversationsItem',
    props: [ 'conversation' ],
    components: {
        DeleteIcon
    },
    data() {
        return {
            isActive: false,
            deleteIconVisible: false
        };
    },
    mounted() {
        EventBus.$on('conversationSelected', () => this.isActive = false);

        EventBus.$on('newConversation', ({ _id: userId }) => {
            this.isActive = false;

            const conversationAlreadyExists = (this.conversation.members[0]._id == userId && this.conversation.members.length <= 2);
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
        name() {
            return this.conversation.group ? this.conversation.groupName : this.conversation.members[0].name;
        },
        unreadMessages() {
            return this.conversation.group ? 0 : this.conversation.unreadMessages;
        }, 
        avatar() {
            return this.conversation.group ? this.conversation.groupImage : this.conversation.members[0].avatar;
        },
        active() {
            return this.conversation.members.filter(member => member.active).length > 0;
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
        },
        async deleteConversation(event) {
            event.stopPropagation();
            
            await deleteConversation(this.conversation._id);
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
            const userIndex = this.conversation.members.findIndex(user => user._id == userId);
            
            if (userIndex != -1) {
                this.conversation.members[userIndex].active = status;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .conversation {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--primary-border-color);
        cursor: pointer;

        @media (min-width: 900px) {
            &:hover, &--active {
                background: #009ef7;
                transition: .3s ease-in-out;
                border-radius: 2px;

                .conversation__unread-messages {
                    background: var(--primary-background-color);
                    color: #009ef7;
                }

                .conversation__profile--active::after {
                    transition: .3s ease-in-out;
                    border-color: #009ef7;
                }
            }

            &:hover * {
                color: #fff;
            }
            
            &--active * * {
                color: #fff !important;
            }
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
            grid-template-areas: "picture name date"
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
                border: 2px solid var(--primary-background-color);
            }
        }

        &__picture {
            width: inherit;
            height: inherit;
            border-radius: 50%;
            grid-area: picture;       
        }

        &__name {
            color: var(--primary-text-color);
            font-weight: 600;
            grid-area: name;
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
