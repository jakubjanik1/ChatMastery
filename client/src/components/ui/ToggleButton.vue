<template>
    <div class="toggle-button" :class="{ 'toggle-button--checked': checked }">
        <div 
            class="toggle-button__slider"
            @click="toggle"
        >
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToggleButton',
    data() {
        return {
            checked: false
        };
    },
    methods: {
        toggle() {
            this.checked = ! this.checked;
            
            this.$emit('change');
        }
    }
}
</script>

<style lang="scss" scoped>
    .toggle-button {
        width: 16px;
        background: #c3c4c4;
        height: 16px;
        position: relative;
        margin: 0 8px 0 16px;

        &::after, &::before {
            content: "";
            position: absolute;
            top: 0;
            background: #c3c4c4;
            border-radius: 50%;
            height: 16px;
            width: 16px;
            z-index: 0;
        }

        &::after {
            right: -8px;
        }

        &::before {
            left: -8px;
        }

        &__slider {
            width: 14px;
            height: 14px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: 1px;
            left: -7px;
            cursor: pointer;
        }

        &--checked {
            background: #009ef7;
            
            &::before, &::after {
                background: #009ef7;
            }

            .toggle-button__slider {
                left: unset;
                right: -7px;
                z-index: 100;
            }
        }
    }
</style>