<template>
    <div class="chat-header">
        <users-search-box />

        <img class="chat-header__logo" :src="logo">

        <user-info />
    </div>
</template>

<script>
import UsersSearchBox from './UsersSearchBox';
import UserInfo from './UserInfo';
import EventBus from '@/helpers/EventBus';

export default {
    name: 'ChatHeader',
    components: {
        UsersSearchBox,
        UserInfo
    },
    data() {
        return {
            theme: 'light'
        };
    },
    created() {
        EventBus.$on('changeTheme', () => {
            console.log(1)
            this.theme = (this.theme == 'light') ? 'dark' : 'light';
        });
    },
    computed: {
        logo() {
            return `logo_${ this.theme }.png`;
        }
    }
}
</script>

<style lang="scss" scoped>
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        background: var(--primary-background-color);
        grid-area: header;

        &__logo {
            height: 45px;
        }
    }

    @media (max-width: 900px) {
        .chat-header {
            flex-direction: column;
            height: 100%;
            width: 100vw;
            align-items: center;

            &__logo {
                order: 1;
                margin: 12px 0 8px 0;
            }
        }
    }
</style>