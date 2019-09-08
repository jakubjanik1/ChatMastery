<template>
  <div id="app" :class="{ 'app__dark' : this.theme == 'dark' }">
    <chat v-if="isLoggedIn" />
    <login v-else-if="! isLoading" />
  </div>
</template>

<script>
import Chat from '@/views/Chat';
import Login from '@/views/Login';
import UsersService from './services/UsersService';
import EventBus from '@/helpers/EventBus';

export default {
  name: 'app',
  components: {
    Chat,
    Login
  },
  data() {
    return {
      isLoggedIn: false,
      isLoading: true,
      theme: 'light'
    }
  },
  async created() {
    this.setViewportVariable();
    window.addEventListener('resize', this.setViewportVariable);

    localStorage.setItem('theme', 'light');
    EventBus.$on('changeTheme', this.changeTheme);

    if (location.pathname != '/') {
      this.isLoading = false;
      return;
    }

    await this.fetchUser();
    this.isLoading = false;
  },
  methods: {
    setViewportVariable() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    async fetchUser() {
      const response = await UsersService.fetchLoggedInUser();
      
      this.isLoggedIn = (Object.entries(response.data).length != 0);
      this.$root.user = response.data;
    },
    changeTheme() {
      this.theme = (this.theme == 'light') ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
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
    background: var(--secondary-background-color);
  }

  :root {
    --primary-text-color: #292929;
    --primary-background-color: #fff;
    --secondary-background-color: #f6f6f6;
    --tertiary-background-color: #fafafa;
    --primary-border-color: #f2f2f2;
    --secondary-border-color: #d9d9d9;
  }

  .app__dark {
    --primary-text-color: #fff;
    --primary-background-color: #414141;
    --secondary-background-color: #313131;
    --tertiary-background-color: #353535;
    --primary-border-color: #525252;
    --secondary-border-color: #292929;
  }
</style>
