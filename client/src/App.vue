<template>
  <div id="app">
    <conversations-list></conversations-list>
    <chat-box></chat-box>
  </div>
</template>

<script>
import ConversationsList from "./components/ConversationsList";
import ChatBox from './components/ChatBox';

export default {
  name: 'app',
  components: {
    ConversationsList,
    ChatBox
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

  body {
    font-family: 'Montserrat', sans-serif;;
    font-size: 14px;
    margin: 0;
    overflow: hidden;
  }

  #app {
    display: flex;
  }
</style>
