<template>
    <div class="users-search-result">
        <img class="users-search-result__picture" src="@/assets/profile.jpg">
        <div class="users-search-result__name">{{ user.name }}</div>
    </div>    
</template>

<script>
export default {
    name: 'UsersSearchResult',
    props: [ 'user' ]
}
</script>

<style lang="scss" scoped>
    .users-search-result {
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

        &:last-of-type {
            margin-bottom: 66px;
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
