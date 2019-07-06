<template>
  <div id="app">
    <chat />
  </div>
</template>

<script>
import Chat from '@/views/Chat';

export default {
  name: 'app',
  components: {
    Chat
  },
  created() {
    this.setViewportVariable();
    window.addEventListener('resize', this.setViewportVariable);
  },
  methods: {
    setViewportVariable() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
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
</style>
