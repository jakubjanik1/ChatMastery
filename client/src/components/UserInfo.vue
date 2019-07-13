<template>
    <div class="user-info">
        <img class="user-info__avatar" :src="$store.user.avatar">
        <div class="user-info__name">{{ $store.user.name }}</div>

        <b-dropdown variant="link" no-caret right>
            <template slot="button-content"> 
                <arrow-down-icon fillColor="#c3c4c4" /> 
            </template>

            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="http://localhost:8080/users/logout">Logout</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import ArrowDownIcon from 'vue-material-design-icons/ChevronDown';
import { BDropdown, BDropdownItem } from 'bootstrap-vue';

export default {
    name: 'UserInfo',
    components: {
        BDropdown,
        BDropdownItem,
        ArrowDownIcon
    }
}
</script>

<style lang="scss">
    @import 'node_modules/bootstrap/scss/bootstrap';
    @import 'node_modules/bootstrap-vue/src/index.scss';

    .user-info {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 360px - 40px;
        margin-right: 40px;

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

        @media (max-width: 900px) {
            order: 2;
            justify-content: center;
            margin-right: 0;
            margin: 8px 0;
        }
    }
    
    .dropdown-menu {
        padding: 0;
        margin-top: 10px;
        border-color: #f2f2f2;
        border-radius: 2px;

        & > :first-child {
            border-bottom: 1px solid #f9f9f9;
        }

        @media (max-width: 900px) {
            margin-top: 6px;
        }
    }

    .dropdown-item {
        font-size: 14px;
        color: #9e9e9e;
        box-sizing: border-box;
        border-radius: 2px;
        text-align: center;

        &:hover {
            background: #009ef7;
            color: #fff;
        }
    }

    .dropdown-toggle {
        padding: 0;
        padding-left: 4px;
    }
</style>
