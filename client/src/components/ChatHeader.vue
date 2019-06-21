<template>
    <div class="chat-header">
        <search-icon 
            class="chat-header__search"
            :size="27" 
            fillColor="#c3c4c4">

        </search-icon>

        <img class="chat-header__logo" src="@/assets/logo.png">

        <div class="chat-header__wrapper">
            <a class="chat-header__link" href="#">DOWNLOAD APP</a>
            <a class="chat-header__link" href="#">LOGOUT</a>
        </div>
    </div>
</template>

<script>
import SearchIcon from 'vue-material-design-icons/Magnify';

export default {
    name: 'ChatHeader',
    components: {
        SearchIcon
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
        border-bottom: 2px solid #f2f2f2;
        grid-area: header;

        &__search {
            cursor: pointer;
            margin-top: 5px;
            margin-left: 40px;
            width: 360px - 40px;
        }

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
</style>
