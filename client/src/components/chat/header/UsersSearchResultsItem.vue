<template>
    <div class="users-search-results-item" :class="{ 'users-search-results-item--selected' : selected }" @click="$emit('click')">
        <div 
            class="users-search-results-item__profile" 
            :class="{ 'users-search-results-item__profile--active' : user.active }"
        >
            <img class="users-search-results-item__picture" :src="user.avatar">
        </div>

        <div class="users-search-results-item__name">{{ user.name }}</div>
    </div>    
</template>

<script>
export default {
    name: 'UsersSearchResultsItem',
    props: [ 'user', 'selected' ]
}
</script>

<style lang="scss" scoped>
    .users-search-results-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--primary-border-color);
        padding: 14px 20px;

        &__profile {
            width: 50px;
            height: 50px;
            margin-right: 20px;
            position: relative;
            
            &--active::after {
                content: '';
                position: absolute;
                right: 1px;
                bottom: 1px;
                width: 12px;
                height: 12px;
                background: #2ecd8a;
                border-radius: 50%;
                border: 2px solid var(--primary-background-color);
            }
        }

        &__picture {
            height: inherit;
            width: inherit;
            border-radius: 50%;
            
        }

        &__name {
            color: var(--primary-text-color);
            font-weight: 600;
        }

         &:hover, &--selected {
            background: #009ef7;
            cursor: pointer;
            border-radius: 2px;
            transition: .3s ease-in-out;

            & * {
                color: #fff;
            }

            .users-search-results-item__profile--active::after {
                transition: .3s ease-in-out;
                border-color: #009ef7;
            }
        }
    }
</style>
