<template>
    <button v-on="$listeners" v-bind="$attrs">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'AppButton'
}
</script>

<style lang="scss" scoped>
    button {
        font: {
            size: 16px;
            family: inherit;
        }
        border: 0;
        color: #fff;
        border-radius: 2px;
        background: #009ef7;
        padding: 10px 32px;
        font-weight: 600;
        margin-top: 32px;

            &:focus {
            outline: 0;
        }

        &:hover {
            transition: .3s ease-in-out;
            cursor: pointer;
            background: darken(#3399FF, 5%);
        }
    }
</style>