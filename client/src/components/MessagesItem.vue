<template>
    <div class="message" :class="getClass">
        <img class="message__author" src="@/assets/profile.jpg">
        <div class="message__date">{{ date }}</div>

        <div class="message__bubble">
            <div class="message__body">{{ message.body }}</div>
        </div>
    </div>
</template>

<script>
import { formatDate } from '@/helpers';

export default {
    name: 'MessagesItem',
    props: [ 'message' ],
    computed: {
        date() {
            return formatDate(this.message.createdAt);
        },
        getClass() {
            const userId = localStorage.getItem('userId');

            const isSender = userId == (this.message.author._id || this.message.author);
            return isSender ? 'message--sender' : 'message--receiver';
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
            padding-bottom: 50px + 64px;

            .message__date {
                bottom: 32px + 64px;
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
</style>
