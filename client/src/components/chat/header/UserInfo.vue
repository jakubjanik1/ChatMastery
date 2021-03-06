<template>
    <div class="user-info">
        <img class="user-info__avatar" :src="$root.user.avatar">
        <div class="user-info__name">{{ $root.user.name }}</div>
        <arrow-down-icon 
            class="user-info__caret" 
            fillColor="#c3c4c4"
            @click="toggleOptions"
            v-icon-hover
        />
 
        <transition>
            <div class="user-info__options" v-show="showOptions">
                <div class="user-info__option">
                    Dark mode
                    <toggle-button @change="changeTheme" />
                </div>

                <div class="user-info__option" @click="showProfile = true">Profile</div>
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
import ToggleButton from '@/components/ui/ToggleButton';

export default {
    name: 'UserInfo',
    components: {
        ArrowDownIcon,
        Profile,
        ToggleButton
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
            const isDarkModeOption = e.composedPath().filter(el => {
                return ! el.previousElementSibling && typeof el.className == 'string' && el.className.includes('option')
            }).length;

            const isNotToggleButton = (e.target.textContent != 'Chevron Down icon');

            if (isNotToggleButton && ! isDarkModeOption) {
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
            width: 160px;
            background: var(--primary-background-color);
            border: 1px solid var(--primary-border-color);
            border-radius: 2px;
            z-index: 1;
        }

        &__option {
            padding: 6px;
            display: flex;
            text-decoration: none;
            justify-content: center;
            align-items: center;
            color: #9e9e9e;
            border-radius: 2px;

            &:not(:first-child):hover {
                background: #009ef7;
                color: #fff;
                cursor: pointer;
            }

            &:not(:last-child) {
                border-bottom: 1px solid var(--primary-border-color);
            }
        }

        @media (max-width: 900px) {
            order: 2;
            justify-content: center;
            margin-right: 0;
            margin: 10px 0 5px 0;
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
