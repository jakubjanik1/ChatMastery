<template>
    <div class="users-search-results-item" @click="emitNewConversation">
        <img class="users-search-results-item__picture" src="@/assets/profile.jpg">
        <div class="users-search-results-item__name">{{ user.name }}</div>
    </div>    
</template>

<script>
import EventBus from '@/services/EventBus';

export default {
    name: 'UsersSearchResultsItem',
    props: [ 'user' ],
    methods: {
        emitNewConversation() {
            EventBus.$emit('newConversation', this.user);
            localStorage.setItem('receiverUserId', this.user._id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .users-search-results-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f9f9f9;
        padding: 14px 20px;

        &__picture {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            margin-right: 20px;
        }

        &__name {
            color: #292929;
            font-weight: 600;
        }

         &:hover {
            background: #009ef7;
            cursor: pointer;
            border-radius: 2px;
            transition: .3s ease-in-out;

            & * {
                color: #fff;
            }
        }
    }
</style>
