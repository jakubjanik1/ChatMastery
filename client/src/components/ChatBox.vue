<template>
    <div class="chat-box">
        <messages-list></messages-list>
        <message-input></message-input>
    </div>
</template>

<script>
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';

export default {
    name: 'ChatBox',
    components: {
        MessagesList,
        MessageInput
    }
}
</script>

<style lang="scss" scoped>
    .chat-box {
        grid-area: chat-box;
        width: 100%;
    }
</style>
