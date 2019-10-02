<template>
    <div class="user-info">
        <img class="user-info__avatar" :src="$root.user.avatar">
        <div class="user-info__name">{{ $root.user.name }}</div>
        <arrow-down-icon 
            class="user-info__caret" 
            fillColor="#c3c4c4"
            @click="toggleOptions"
            title=""
            v-icon-hover
        />
 
        <transition>
            <div class="user-info__options" v-show="showOptions">
                <a class="user-info__option" @click.prevent="changeTheme" href="">Change theme</a>
                <a class="user-info__option" @click.prevent="showProfile = true" href="">Profile</a>
                <a class="user-info__option" @click="logout" :href="`${ $baseUrl }/users/logout`">Logout</a>
            </div>
        </transition>

        <profile :show="showProfile" @close="showProfile = false" />
    </div>
</template>

<script>
import ArrowDownIcon from 'vue-material-design-icons/ChevronDown';
import Profile from '@/views/Profile';
import EventBus from '@/helpers/EventBus';

export default {
    name: 'UserInfo',
    components: {
        ArrowDownIcon,
        Profile
    },
    data() {
        return {
            showOptions: false,
            showProfile: false
        };
    },
    created() {
        window.onclick = this.hideOptions;
    },
    methods: {
        toggleOptions() {
            this.showOptions = !this.showOptions;
        },
        hideOptions(e) {
            const isNotToggleButton = (e.target.textContent != 'Chevron Down icon');
            if (isNotToggleButton) {
                this.showOptions = false;
            }
        },
        logout() {
            this.$socket.emit('userLogout');
        },
        changeTheme() {
            EventBus.$emit('changeTheme');
        }
    }
}
</script>

<style lang="scss">
    .user-info {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 360px - 40px;
        margin-right: 40px;
        position: relative;

        &__avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right: 12px;
        }

        &__name {
            font-size: 14px;
            font-weight: 600;
            color: var(--primary-text-color);
        }

        &__caret {
            cursor: pointer;
            height: 24px;
            margin-left: 4px;
        }

        &__options {
            position: absolute;
            top: 40px;
            right: 5px;
            width: 149px;
            background: var(--primary-background-color);
            border: 1px solid var(--primary-border-color);
            border-radius: 2px;
            z-index: 1;

            transition: 1s;
        }

        &__option {
            padding: 6px;
            display: block;
            text-decoration: none;
            text-align: center;
            color: #9e9e9e;
            border-radius: 2px;

            &:hover {
                background: #009ef7;
                color: #fff;
            }

            &:not(:last-of-type) {
                border-bottom: 1px solid var(--primary-border-color);
            }
        }

        @media (max-width: 900px) {
            order: 2;
            justify-content: center;
            margin-right: 0;
            margin: 8px 0;
            width: auto;
        }
    }

    .v-enter-active, .v-leave-active {
        transition: opacity .2s;
    }

    .v-enter, .v-leave-to {
        opacity: 0;
    }
</style>
