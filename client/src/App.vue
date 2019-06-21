<template>
  <div id="app">
    <chat-header></chat-header>
    <conversations-list></conversations-list>
    <chat-box></chat-box>
  </div>
</template>

<script>
import ChatHeader from './components/ChatHeader';
import ConversationsList from "./components/ConversationsList";
import ChatBox from './components/ChatBox';

export default {
  name: 'app',
  components: {
    ChatHeader,
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
    display: grid;
    grid-template-columns: 360px auto;
    grid-template-areas: "header header"
                         "conversations-list chat-box";
  }
</style>
