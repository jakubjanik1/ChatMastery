<template>
  <div id="app">
    <chat v-if="isLoggedIn" />
    <login v-else />
  </div>
</template>

<script>
import Chat from '@/views/Chat';
import Login from '@/views/Login';
import UsersService from './services/UsersService';

export default {
  name: 'app',
  components: {
    Chat,
    Login
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
