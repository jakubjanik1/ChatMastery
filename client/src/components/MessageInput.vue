<template>
    <div class="message-input" :class="{ 'message-input--invisible' : !isVisible }">
        <attachment-icon 
            class="message-input__icon message-input__icon--attachment" 
            fillColor="#c3c4c4" 
            :size="28" 
            @click="openImageInput"
            v-icon-hover
        />

        <input 
            class="message-input__image" 
            ref="image" 
            type="file"
            accept="image/*"
            @change="addImage"
        >

        <emoji-icon 
            class="message-input__icon message-input__icon--emoji" 
            fillColor="#c3c4c4"
            :size="28" 
            @click="showEmojiPicker = !showEmojiPicker" 
            v-icon-hover
        />

        <emoji-picker 
            class="message-input__emoji-picker"
            v-if="showEmojiPicker"
            :showPreview="false"
            :showSearch="false"
            :showSkinTones="false"
            color="#009ef7"
            @select="appendEmoji"
        />

        <div class="message-input__scroll" v-bar>
             <textarea 
                class="message-input__text" 
                placeholder="Type a message..."
                spellcheck="false"
                v-model="text"
                @focus="emitMessageInputFocus"
                :class="{ 'message-input__text--empty': !isMultiline || isEmpty }">

            </textarea>
        </div>

        <button 
            class="message-input__button" 
            :disabled="isEmpty" 
            @click="addMessage"
        >
            SEND
        </button>
    </div>
</template>

<script>
import ChatService from '@/services/ChatService';
import UploadService from '@/services/UploadService';
import EventBus from '@/services/EventBus';
import AttachmentIcon from 'vue-material-design-icons/Paperclip';
import EmojiIcon from 'vue-material-design-icons/Emoticon';
import { Picker } from 'emoji-mart-vue-fast';
import 'emoji-mart-vue-fast/css/emoji-mart.css'

export default {
    name: 'MessageInput',
    components: {
        AttachmentIcon,
        EmojiPicker: Picker,
        EmojiIcon
    },
    data() {
        return {
            text: '',
            image: null,
            isVisible: false,
            showEmojiPicker: false
        };
    },
    created() {
        EventBus.$on('conversationSelected', this.setup);
        EventBus.$on('newConversation', this.setup);

        document.onclick = this.hideEmojiPicker;
    },
    methods: {
        async addImage(event) {
            const image = event.target.files[0];
            event.target.files = null;

            const response = await UploadService.uploadImage(image, 'messages');
            this.image = response.data.url;

            this.addMessage();
        },
        async addMessage() {
            const userId = this.$root.user._id;
            const conversationId = await this.getConversationId();
            
            localStorage.setItem('conversationId', conversationId.data);

            const body = {
                type: this.image ? 'image' : 'text',
                content: this.image ? this.image : this.text
            };
            
            await ChatService.storeMessage({
                'body': { ...body },
                'conversationId': conversationId.data,
                'author': userId
            });

            this.image = null;
            this.text = '';
        },
        async getConversationId() {
            const conversationId = localStorage.getItem('conversationId');
            if (conversationId) {
                return { data: conversationId };
            } else {
                return await ChatService.storeConversation({
                    'members': [
                        this.$root.user._id,
                        localStorage.getItem('receiverUserId')
                    ]
                });
            }
        },
        setup() {
            this.isVisible = true;
            this.text = '';
        },
        openImageInput() {
            this.$refs.image.click();
        },
        emitMessageInputFocus() {
            EventBus.$emit('messageInputFocus');
        },
        appendEmoji(emoji) {
            this.text += emoji.native;
        },
        hideEmojiPicker(event) {
            const path = event.path.slice(0, event.path.length - 2);

            const isOutsideEmojiPicker = ! path.some(elem => {
               return [...elem.classList].includes('message-input__emoji-picker')
                    || [...elem.classList].includes('emoticon-icon');
            });

            if (isOutsideEmojiPicker) {
                this.showEmojiPicker = false;
            }
        }
    },
    computed: {
         isEmpty() {
            return this.text.trim() == '';
        },
        isMultiline() {
            return this.text.includes('\n');
        }
    }
}
</script>

<style lang="scss" scoped>
    .message-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px 0 16px;
        height: 55px;
        background: #fafafa;
        border-top: 2px solid #f2f2f2;
        grid-area: message-input;
        position: relative;

        &--invisible {
            border-top-color: #f6f6f6;
            background: #f6f6f6;

            & > * {
                display: none;
            }
        }

        &__scroll {
            width: 100%;
            margin-right: 32px;
        }

        &__text {
            color: #292929;
            padding: 0;
            background: inherit;
            height: 100%;
            padding: 0;
            resize: none;
            margin-left: 16px;

            &:focus {
                outline: 0;
            }

            &::placeholder {
                font-size: 14px;
                font-weight: 500;
                color: #292929;
            }

            &--empty {
                padding-top: 17px;
            }
        }

        &__image {
            width: 26px;
            height: 28px;

            &::before {
                width: 32px;
                height: 32px;
                background: #fafafa;
                content: '';
                display: inline-block;
            }
        }

        &__emoji-picker {
            position: absolute; 
            bottom: 64px;
            left: 8px;
            font-family: inherit;
            font-size: inherit;
            border: 1px solid #d9d9d9 !important;
        }

        &__icon {
            cursor: pointer;
            height: 28px;

            &--attachment {
                position: absolute;
                left: 16px;
            }

            &--emoji {
                margin-left: 6px;
            }
        }

        &__button {
            color: #2ca9f8;
            background: transparent;

            &:hover {
                color: #0393f7;
                cursor: pointer;
            }
        }

        & * {
            font-family: inherit;
            font-size: 14px;
            font-weight: 600;
            border: 0;
        }

        @media (max-width: 900px) {
            padding: 0 12px 0 12px;
            height: 50px;

            &__input::placeholder {
                font-size: 13px;
            }

            &__text {
                margin-left: 12px;
            }

            &__icon {
                left: 12px;

                &--emoji {
                    display: none;
                }
            }

            & * {
                font-size: 13px;
            }
        }
    }
</style>