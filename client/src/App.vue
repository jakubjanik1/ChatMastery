<template>
  <div id="app">
    <chat v-if="isLoggedIn" />
    <div v-else>
      <a href="http://192.168.0.103:8080/auth/github">github</a>
    </div>
  </div>
</template>

<script>
import Chat from '@/views/Chat';
import UsersService from './services/UsersService';

export default {
  name: 'app',
  components: {
    Chat
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    this.setViewportVariable();
    window.addEventListener('resize', this.setViewportVariable);

    this.fetchUser();
  },
  methods: {
    setViewportVariable() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    async fetchUser() {
      const response = await UsersService.fetchLoggedInUser();
      
      this.isLoggedIn = (Object.entries(response.data).length != 0);
      this.$store.user = response.data;
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
