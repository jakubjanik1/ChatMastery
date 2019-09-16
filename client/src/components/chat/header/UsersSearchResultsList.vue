<template>
    <div class="users-search-results-list">
        <div class="users-search-results-list--found" v-if="users.length">
            <vue-scroll>
                <users-search-results-item
                    :key="user._id" 
                    v-for="user in users" 
                    :user="user" 
                    @click="emitNewConversation(user)"
                />

            </vue-scroll>
        </div>

        <div class="users-search-results-list--start" v-else-if="searchedName == ''">
            <users-search-icon :size="80" fillColor="#009ef7" />
            <div class="users-search-results-list__info">Search for chat friends</div>
            <div class="users-search-results-list__more">
                <div>Find existing chat or start new one.</div>
                <div>Users are filtered by their name.</div>
            </div>
        </div>

         <div class="users-search-results-list--not-found" v-else>
            <users-not-found :size="80" fillColor="#009ef7" />
            <div class="users-search-results-list__info">Nothing found</div>
            <div class="users-search-results-list__more">
                <div>Nothing matched your search terms.</div>
                <div>Maybe try to search again.</div>
            </div>
        </div>
    </div>
</template>

<script>
import UsersSearchResultsItem from './UsersSearchResultsItem';
import UsersSearchIcon from 'vue-material-design-icons/AccountSearch';
import UsersNotFound from 'vue-material-design-icons/AccountRemove';
import EventBus from '@/helpers/EventBus';

export default {
    name: 'UsersSearchResultsList',
    components: {
        UsersSearchResultsItem,
        UsersSearchIcon,
        UsersNotFound
    },
    props: [
        'users',
        'searchedName'
    ],
    methods: {
        emitNewConversation(user) {
            EventBus.$emit('newConversation', user);
            localStorage.setItem('receiverUserId', user._id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .users-search-results-list {
        position: absolute;
        top: 52px;
        width: 360px - 2px;
        background: var(--primary-background-color);
        z-index: 1;
        left: 0;
        height: calc((var(--vh, 1vh) * 100) - (64px));

        &--found {
            height: inherit;
        }

        &--start, &--not-found {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            height: inherit;
        }

        &__info {
            font-weight: 600;
            font-size: 14px;
            color: var(--primary-text-color);
        }

        &__more {
            font-size: 13px;
            color: #9e9e9e;
            padding: 10px 50px;
            text-align: center;
            line-height: 1.5em;
        }

        @media (max-width: 900px) {
            width: 100vw;
            top: 161px;

            &--found {
                height: calc((var(--vh, 1vh) * 100) - (160px));
            }
        }
    }

</style>
