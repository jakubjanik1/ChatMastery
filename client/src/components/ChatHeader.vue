<template>
    <div class="chat-header">
        <users-search-box></users-search-box>

        <img class="chat-header__logo" src="@/assets/logo.png">

        <div class="chat-header__wrapper">
            <a class="chat-header__link" href="#">DOWNLOAD APP</a>
            <a class="chat-header__link" href="#">LOGOUT</a>
        </div>
    </div>
</template>

<script>
import UsersSearchBox from './UsersSearchBox';

export default {
    name: 'ChatHeader',
    components: {
        UsersSearchBox
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

        &__link {
            text-decoration: none;
            font: {
                weight: 600;
                size: 12px;
            };
            color: #c3c4c4;

            &:hover {
                transition: .3s;
                color: #a3a3a3;
            }

            &:last-of-type {
                margin-left: 45px;
            }
        }

        &__wrapper {
            text-align: right;
            width: 360px - 40px;
            margin-right: 40px;
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

            &__wrapper {
                order: 2;
                text-align: center;
                margin-right: 0;
                margin: 8px 0;
            }
        }
    }
</style>
