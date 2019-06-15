<template>
  <div id="app">
    <conversations-list></conversations-list>
  </div>
</template>

<script>
import ConversationsList from "./components/ConversationsList";

export default {
  name: 'app',
  components: {
    ConversationsList
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

  body {
    font-family: 'Montserrat', sans-serif;;
    font-size: 14px;
    margin: 0;
  }
</style>
