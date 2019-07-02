<template>
    <div class="users-search-box">
        <search-icon 
            class="users-search-box__icon"
            :size="27" 
            fillColor="#c3c4c4"
            v-show="! isOpen"
            @click="isOpen = true">

        </search-icon>

        <input 
            class="users-search-box__input"
            :class="{ 'users-search-box__input--focus': isOpen }"
            placeholder="Find a user..."
            ref="input"
            v-show="isOpen" 
            v-model="name"
            @focus="isOpen = true"
            @keyup="refreshResults">

        <close-icon
            class="users-search-box__close"
            fillColor="#c3c4c4"
            :size="27"
            v-show="isOpen"
            @click="hideResultsList">

        </close-icon>

        <div class="users-search-box__results" v-show="isOpen">
            <vue-scroll>
                <users-search-result 
                    :key="user._id" 
                    v-for="user in foundUsers" 
                    :user="user">

                </users-search-result>
            </vue-scroll>
        </div>
    </div>
</template>

<script>
import SearchIcon from 'vue-material-design-icons/Magnify';
import CloseIcon from 'vue-material-design-icons/Close';
import UsersSearchResult from './UsersSearchResult';
import UsersService from '@/services/UsersService';

export default {
    name: 'UsersSearchBox',
    components: {
        SearchIcon,
        CloseIcon,
        UsersSearchResult
    },
    data() {
        return {
            isOpen: false,
            name: '',
            foundUsers: []
        }
    },
    methods: {
        async refreshResults() {
            if (this.name == '') {
                this.foundUsers = [];
                return;
            }

            const response = await UsersService.search(this.name);
            this.foundUsers = response.data;
        },
        focusOnInput() {
            if (this.isOpen) {
                this.$refs.input.focus();
            }
        },
        hideResultsList() {
            this.isOpen = false;
            this.$refs.input.blur();
        }
    },
    watch: {
        isOpen() {
            if (! this.isOpen) {
                this.name = '';
                this.foundUsers = [];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .users-search-box {
        display: flex;
        align-items: center;
        width: 320px;
        padding-left: 40px;
        position: relative;

        &__icon:hover, &__close:hover {
            cursor: pointer;           
        }

        &__icon, &__close {
            height: 100%;
            display: flex;
            align-items: center;
        }

        &__close {
            animation: fade-in .3s;
        }

        &__results {
            position: absolute;
            top: 52px;
            height: calc((var(--vh, 1vh) * 100) - (64px));
            width: 360px - 2px;
            background: #fff;
            z-index: 1;
            left: 0;
        }

        &__input {
            animation: fade-in .3s;
            font-family: inherit;
            font-size: 14px;
            border: 0;
            padding: 8px;
            margin-right: 4px;
            border: 1px solid #f2f2f2;
            border-radius: 2px;
            width: 250px - 16px;

            &:focus {
                outline: 0;
            }
        }

        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    }

    @media (max-width: 900px) {
        .users-search-box {
            margin: 8px 0 12px 0;
            padding-left: 0;
            order: 3;
            position: static;
            max-width: 270px;

            &__results {
                height: calc((var(--vh, 1vh) * 100) - (146px));
                width: 100vw;
                top: 149px;
            }

            &__input {
                display: block !important;
                max-width: 270px;
                width: 100%;
                margin-right: 0;

                &--focus {
                    width: 226px;
                }
            }

            &__icon {
                display: none;
            }
        }
    }
</style>
