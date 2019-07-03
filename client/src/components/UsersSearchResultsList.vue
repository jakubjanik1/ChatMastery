<template>
    <div class="users-search-results-list">
        <div class="users-search-results-list--found" v-if="users.length">
            <vue-scroll>
                <users-search-results-item
                    :key="user._id" 
                    v-for="user in users" 
                    :user="user" />

            </vue-scroll>
        </div>

        <div class="users-search-results-list--start" v-else-if="searchedName == ''">
            <account-search-icon :size="80" fillColor="#009ef7" />
            <div class="users-search-results-list__info">Search for chat friends</div>
            <div class="users-search-results-list__more">
                Find existing chat or start new one.
                Users are filtered by their name.
            </div>
        </div>
    </div>
</template>

<script>
import UsersSearchResultsItem from './UsersSearchResultsItem';
import AccountSearchIcon from 'vue-material-design-icons/AccountSearch';

export default {
    name: 'UsersSearchResultsList',
    components: {
        UsersSearchResultsItem,
        AccountSearchIcon
    },
    props: [
        'users',
        'searchedName'
    ]
}
</script>

<style lang="scss" scoped>
    .users-search-results-list {
        position: absolute;
        top: 52px;
        height: calc((var(--vh, 1vh) * 100) - (64px));
        width: 360px - 2px;
        background: #fff;
        z-index: 1;
        left: 0;

        &--start {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
        }

        &__info {
            font-weight: 600;
            font-size: 14px;
            color: #292929;
        }

        &__more {
            font-size: 13px;
            color: #9e9e9e;
            padding: 10px 50px;
            text-align: center;
            line-height: 1.5em;
        }

        @media (max-width: 900px) {
            height: calc((var(--vh, 1vh) * 100) - (146px));
            width: 100vw;
            top: 149px;
        }
    }

</style>
