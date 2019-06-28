<template>
  <div class="app" :class="showChat ? 'app__chat' : 'app__conversations'">
    <chat-header v-show="! showChat || isLarge"></chat-header>
    <conversations-list v-show="! showChat || isLarge"></conversations-list>
    <chat-box v-show="showChat || isLarge"></chat-box>
  </div>
</template>

<script>
import ChatHeader from './components/ChatHeader';
import ConversationsList from "./components/ConversationsList";
import ChatBox from './components/ChatBox';
import EventBus from '@/services/EventBus';

export default {
  name: 'app',
  components: {
    ChatHeader,
    ConversationsList,
    ChatBox
  },
  data() {
    return {
      showChat: false,
      isLarge: true
    }
  },
  created() {
    EventBus.$on('conversationSelected', () => this.showChat = true);
    EventBus.$on('returnToConversations', () => this.showChat = false);
    EventBus.$on('newConversation', () => this.showChat = true);

    this.setViewportVariable();
    window.onresize = () => this.setViewportVariable();
  },
  methods: {
    setViewportVariable() {
      this.checkScreenWidth();

      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    checkScreenWidth() {
      if (window.innerWidth < 900) {
        this.isLarge = false;
      }
    }
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

  .app {
    display: grid;
    grid-template-columns: 360px auto;
    grid-template-rows: 64px auto 64px;
    grid-template-areas: "header header"
                         "conversations-list chat-box"
                         "conversations-list chat-box";
  }

  @media (max-width: 900px) {
    .app {
      &__conversations {
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        grid-template-areas: "header header"
                             "conversations-list conversations-list";
      }

      &__chat {
        grid-template-columns: auto;
        grid-template-rows: auto;
        grid-template-areas: "chat-box";            
      }
    }      
  }
</style>
