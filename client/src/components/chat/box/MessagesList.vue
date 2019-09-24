<template>
    <div class="messages">
        <loading-circle :loading="isLoading" />

        <vue-scroll ref="scroll" v-show="! isLoading" @handle-scroll="handleScroll">
            <messages-receiver-info v-show="everythingLoaded" />

            <messages-item 
                :key="message._id"
                v-for="(message, index) in messages"
                :class="{ 'last' : index == messages.length - 1 }"
                :message="message"
            />
        </vue-scroll>

        <arrow-down-icon 
            class="messages__scroll-down" 
            @click="scrollDown" 
            v-if="showScrollDownButton" 
            fillColor="#c3c4c4" 
            :size="30" 
        />
    </div>
</template>

<script>
import { fetchMessages } from '@/services/ChatService';
import EventBus from '@/helpers/EventBus';
import MessagesItem from './MessagesItem';
import MessagesReceiverInfo from './MessagesReceiverInfo';
import LoadingCircle from '@/components/common/LoadingCircle';
import ArrowDownIcon from 'vue-material-design-icons/ArrowDown';
import uniqBy from 'lodash/uniqBy';

export default {
    name: 'MessagesList',
    components: {
        MessagesItem,
        MessagesReceiverInfo,
        LoadingCircle,
        ArrowDownIcon
    },
    data() {
        return {
            messages: [],
            isLoading: false,
            showScrollDownButton: false,
            part: 0,
            everythingLoaded: false
        };
    },
    mounted() {
        localStorage.setItem('conversationId', '');

        EventBus.$on('conversationSelected', async ({ _id: id }) => {
            localStorage.setItem('conversationId', id);
            this.part = 0;
            this.everythingLoaded = false;
            this.showScrollDownButton = false;

            await this.getMessages(id);

            if (this.messages.length < 10) {
                this.everythingLoaded = true;
            }

            this.scrollDown();
        });

        EventBus.$on('newConversation', () => {
            localStorage.setItem('conversationId', '');
            
            this.messages = [];

            this.everythingLoaded = true;
        });

        EventBus.$on('messageInputFocus', () => {
            this.scrollDown();
        });
    },
    methods: {
        async getMessages(conversationId) {
            this.isLoading = true;

            const response = await fetchMessages(conversationId, this.part);
            this.messages = response.data; 
            this.messages = uniqBy(this.messages, '_id');   

            this.isLoading = false;
        },
        scrollDown() {
            this.$refs.scroll.scrollIntoView('.last', 0);
        },
        async handleScroll(scroll) {
            const { scrollHeight, scrollTop, clientHeight } = this.$refs.scroll.$el.firstChild;

            if (scrollHeight - (scrollTop + clientHeight) >= 300) {
                this.showScrollDownButton = true;
            } else {
                this.showScrollDownButton = false;
            }

            if (scrollTop == 0 && ! this.everythingLoaded) {
                this.$refs.scroll.$el.firstChild.firstChild.children[2].id = 'last';

                const conversationId = localStorage.getItem('conversationId');
                const response = await fetchMessages(conversationId, ++this.part);
                
                this.messages.unshift(...response.data); 
                this.messages = uniqBy(this.messages, '_id');

                if (! response.data.length) {
                    this.everythingLoaded = true;
                }

                setTimeout(() => this.$refs.scroll.scrollIntoView('#last', 0), 0);
            }   
        }
    },
    sockets: {
        messageAdded(message) {
            const conversationId = localStorage.getItem('conversationId');
            
            if (message.conversationId == conversationId) {
                this.messages.push(message);
                this.scrollDown();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .messages {
        grid-area: messages-list;
        background: var(--secondary-background-color);
        width: 100%;
        height: calc((var(--vh, 1vh) * 100) - (121px));
        border-top: 2px solid var(--primary-border-color);
        position: relative;

        &__scroll-down {
            position: absolute;
            right: calc(50% - 21px);
            border: 1px solid var(--primary-border-color);
            border-radius: 50%;
            height: 30px;
            background: var(--primary-background-color);
            padding: 3px;
            
            @keyframes slide-in {
                from { bottom: -40px; } 
                to { bottom: 6px; }
            }

            animation: .3s slide-in;
            animation-fill-mode: forwards;

            &:hover {
                cursor: pointer;
            }
        }

        @media (max-width: 900px) {
            width: 100vw;
            height: calc((var(--vh, 1vh) * 100) - (94px));
        }
    }
</style>
