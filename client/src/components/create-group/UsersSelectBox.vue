<template>
    <div class="users-select-box" v-click-outside="hide">
        <app-input
            class="users-select-box__input"
            placeholder="Choose users..."
            v-model="name"
            @keyup="searchUser"
            @focus="isOpen = true"
            
        />

        <vue-scroll class="users-select-box__results" v-if="isOpen">
            <users-search-results-item 
                v-for="user in foundUsers" 
                :key="user._id" 
                :user="user" 
                @click="selectUser(user)"
            />
            
        </vue-scroll>

        <vue-scroll class="users-select-box__selected">
            <users-search-results-item
                 v-for="user in selectedUsers" 
                 :key="user._id"
                 :user="user"
            />

        </vue-scroll>
    </div>
</template>

<script>
import AppInput from '@/components/ui/AppInput';
import UsersSearchResultsItem from '@/components/chat/header/UsersSearchResultsItem';
import ClickOutside from 'vue-click-outside';
import UsersSearchMixin from '@/mixins/UsersSearch';

export default {
    name: 'UsersSelectBox',
    mixins: [ UsersSearchMixin ],
    components: {
        AppInput,
        UsersSearchResultsItem
    },
    directives: {
        ClickOutside
    },
    data() {
        return {
            isOpen: false,
            selectedUsers: []
        };
    },
    methods: {
        selectUser(user) {
            if (this.selectedUsers.findIndex(x => x._id == user._id) == -1) {
                this.selectedUsers.push(user);
            }
        },
        hide() {
            this.isOpen = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .users-select-box {
        position: relative;
        height: 100%;
        max-height: 50%;

        &__selected {
            border: 1px solid var(--primary-border-color);
            height: 100%;
            border-radius: 2px;
            margin-top: 32px;
            background: var(--secondary-background-color);
        }
        
        &__results {
            border: 1px solid var(--primary-border-color);
            position: absolute !important;
            top: 68px;
            left: 16px;
            z-index: 1;
            width: calc(100% - 32px) !important;
            height: 100%;
            background: var(--primary-background-color);
        }
    }
</style>