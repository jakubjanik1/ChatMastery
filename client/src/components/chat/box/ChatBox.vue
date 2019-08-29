<template>
    <div class="chat-box">
        <conversation-info />
        <messages-list />
        <message-input />
    </div>
</template>

<script>
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import ConversationInfo from './ConversationInfo';

export default {
    name: 'ChatBox',
    components: {
        MessagesList,
        MessageInput,
        ConversationInfo
    }
}
</script>

<style lang="scss" scoped>
    .chat-box {
        grid-area: chat-box;
        grid-template-columns: auto;
        grid-template-rows: 40px auto 64px;
        grid-template-areas: "conversation-info"
                             "messages-list"
                             "message-input";
        width: 100%;
    }
</style>
