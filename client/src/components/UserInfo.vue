<template>
    <div class="user-info">
        <img class="user-info__avatar" :src="$store.user.avatar">
        <div class="user-info__name">{{ $store.user.name }}</div>
        <arrow-down-icon 
            class="user-info__caret" 
            fillColor="#c3c4c4"
            @click="toggleOptions"
            v-click-outside="hideOptions"
        />
 
        <div class="user-info__options" v-show="showOptions">
            <a class="user-info__option" href="#">Profile</a>
            <a class="user-info__option" :href="`${ $baseUrl }/users/logout`">Logout</a>
        </div>
    </div>
</template>

<script>
import ArrowDownIcon from 'vue-material-design-icons/ChevronDown';
import VClickOutside from 'v-click-outside';

export default {
    name: 'UserInfo',
    components: {
        ArrowDownIcon,
    },
    directives: {
        clickOutside: VClickOutside.directive
    },
    data() {
        return {
            showOptions: false
        };
    },
    methods: {
        toggleOptions() {
            this.showOptions = !this.showOptions;
        },
        hideOptions() {
            this.showOptions = false;
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
            color: #292929;
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
            background: #fff;
            border: 1px solid #f2f2f2;
            border-radius: 2px;
            z-index: 1;
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

            &:first-of-type {
                border-bottom: 1px solid #f9f9f9;
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
</style>
