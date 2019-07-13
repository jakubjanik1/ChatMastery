<template>
    <div class="chat-header">
        <users-search-box />

        <img class="chat-header__logo" src="@/assets/logo.png">

        <user-info />
    </div>
</template>

<script>
import UsersSearchBox from './UsersSearchBox';
import UserInfo from './UserInfo';

export default {
    name: 'ChatHeader',
    components: {
        UsersSearchBox,
        UserInfo
    }
}
</script>

<style lang="scss" scoped>
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        background: #fff;
        grid-area: header;

        &__logo {
            height: 35px;
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