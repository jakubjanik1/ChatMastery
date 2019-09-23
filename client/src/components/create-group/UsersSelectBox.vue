<template>
    <div class="users-select-box" v-click-outside="hide">
        <app-input
            class="users-select-box__input"
            placeholder="Choose users..."
            v-model="name"
            @keyup="searchUser"
            @focus="isOpen = true"
            :error="error"
        />

        <vue-scroll class="users-select-box__results" v-if="isOpen">
            <users-search-results-item 
                v-for="user in foundUsers" 
                :key="user._id" 
                :user="user" 
                @click="selectUser(user)"
                :selected="isSelected(user)"
            />
            
        </vue-scroll>

        <vue-scroll class="users-select-box__selected">
            <users-search-results-item
                class="users-select-box__selected__item"
                 v-for="user in selectedUsers" 
                 :key="user._id"
                 :user="user"
                 @mouseover="onMouseOver"
                 @mouseleave="onMouseLeave"
            >
                <delete-icon 
                    class="users-select-box__selected__delete" 
                    fillColor="#c3c4c4" 
                    ref="delete" 
                    title="Delete user"
                    @click="deleteUser(user._id)"
                    v-if="user._id != $root.user._id"
                />
            </users-search-results-item>
            
            
        </vue-scroll>
    </div>
</template>

<script>
import AppInput from '@/components/ui/AppInput';
import UsersSearchResultsItem from '@/components/chat/header/UsersSearchResultsItem';
import ClickOutside from 'vue-click-outside';
import UsersSearchMixin from '@/mixins/UsersSearch';
import DeleteIcon from 'vue-material-design-icons/Delete';

export default {
    name: 'UsersSelectBox',
    mixins: [ UsersSearchMixin ],
    props: [ 'value', 'error' ],
    components: {
        AppInput,
        UsersSearchResultsItem,
        DeleteIcon
    },
    directives: {
        ClickOutside
    },
    data() {
        return {
            isOpen: false,
            selectedUsers: [ ...this.value ]
        };
    },
    methods: {
        selectUser(user) {
            const foundIndex = this.selectedUsers.findIndex(selectedUser => selectedUser._id == user._id);

            if (foundIndex == -1) {
                this.selectedUsers.push(user);
            } else {
                this.selectedUsers.splice(foundIndex, 1);
            }

            this.$emit('input', this.selectedUsers);
        },
        deleteUser(id) {
            this.selectedUsers = this.selectedUsers.filter(user => user._id != id);

            this.$emit('input', this.selectedUsers);
        },
        isSelected(user) {
            return this.selectedUsers.filter(selectedUser => selectedUser._id == user._id).length;
        },
        hide() {
            this.name = '';
            this.foundUsers = [];
            this.isOpen = false;
        },
        onMouseOver(event) {
            event.target.children[2].firstChild.style.fill = '#fff';
        },
        onMouseLeave() {
            event.target.children[2].firstChild.style.fill = '#c3c4c4';
        }
    },
    watch: {
        value() {
            this.selectedUsers = [ ...this.value ];
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

            &__item {
                position: relative;
            }
            
            &__delete {
                position: absolute;
                height: 24px;
                bottom: calc(50% - 12px);
                right: 20px;
            }
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

            &--selected {
                background: #009ef7;
            }
        }
    }
</style>