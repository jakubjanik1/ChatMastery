<template>
    <div class="message" :class="getClass">
        <img class="message__author" :src="avatar">
        <div class="message__date">{{ date }}</div>

        <div class="message__bubble">
            <div class="message__body--text" v-if="isText">{{ message.body.content }}</div>

            <img 
                class="message__body--image" 
                v-else-if="isImage"
                :src="message.body.content"
                @click="showImage = true"
            >
        </div>

        <image-preview :show="showImage" :img="message.body.content" @close="showImage = false" />
    </div>
</template>

<script>
import { formatDate } from '@/helpers';
import ImagePreview from '@/views/ImagePreview';

export default {
    name: 'MessagesItem',
    props: [ 'message' ],
    components: {
        ImagePreview
    },
    data() {
        return {
            showImage: false
        };
    },
    computed: {
        date() {
            return formatDate(this.message.createdAt);
        },
        avatar() {
            return this.message.author.avatar;
        },
        getClass() {
            const userId = this.$root.user._id;

            const isSender = userId == (this.message.author._id || this.message.author);
            return isSender ? 'message--sender' : 'message--receiver';
        },
        isImage() {
            return this.message.body.type == 'image';
        },
        isText() {
            return this.message.body.type == 'text';
        }
    }
}
</script>

<style lang="scss" scoped>
    .message {
        display: flex;
        align-items: flex-end;
        position: relative;
        padding: 50px 100px 0 100px;
        box-sizing: content-box;

        &:last-of-type {
            padding-bottom: 55px;

            .message__date {
                bottom: 37px;
            }
        }

        &__bubble {
            padding: 16px;
            border-radius: 2px;
            position: relative;
            font-weight: 600;
            max-width: 600px;

            &::after {
                content: '';
                position: absolute;
                border: 12px solid;
            }
        }

        &__body--text {
            white-space: pre-line;
            word-break: break-word;
        }

        &__body--image {
            border-radius: 2px;
            max-width: 100%;
            max-height: 250px;
            margin-bottom: -4px;
            cursor: pointer;
        }

        &__author {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        &__date {
            color: #9e9e9e;
            font-size: 11px;
            position: absolute;
        }
    }

    .message--sender {
        flex-direction: row-reverse;

        .message__bubble {
            background: #cdeafc;  
            color: #25629b;

            &::after {        
                right: -8px;
                bottom: -12px;
                transform: rotate(56deg);
                border-color: #cdeafc transparent transparent #cdeafc;
            }
        }

        .message__author {
            margin-left: 14px;
        }

        .message__date {
            bottom: -18px;
            right: 168px;
        }
    }

    .message--receiver {

        .message__bubble {
            background: #e8e8e8;  
            color: #292929;

            &::after {        
                left: -8px;
                bottom: -12px;
                transform: rotate(-56deg);
                border-color: #e8e8e8 transparent transparent transparent;
            }
        }

        .message__author {
            margin-right: 14px;
        }

         .message__date {
            bottom: -18px;
            left: 168px;
        }
    }

    @media (max-width: 900px) {
        .message {
            padding: 40px 25px 0 25px;
            font-size: 13px;
            width: calc(100vw - 50px);

            &:last-of-type {
                padding-bottom: 40px;

                .message__date {
                    bottom: 25px;
                }
            }

            &__date {
                font-size: 10px;
            }
        }
        
        .message--receiver .message__date {
            bottom: -15px;
            left: 93px;
        }

        .message--sender .message__date {
            bottom: -15px;
            right: 93px;
        }
    }
</style>
