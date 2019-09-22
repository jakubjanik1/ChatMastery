<template>
    <div class="overlay" v-show="show">
        <div class="modal">
            <close-icon 
                class="modal__close" 
                @click="close" 
                fillColor="#c3c4c4" 
                :size="30"
                v-icon-hover 
            />

            <slot />
        </div>
    </div>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close';

export default {
    name: 'AppModal',
    components: {
        CloseIcon
    },
    props: [ 'show' ],
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>
    @media (min-width: 900px) {
        .overlay {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: #00000085;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;
        }
    }

    .modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 700px;
        height: 700px;
        max-width: 800px;
        max-height: 80%;
        background: var(--primary-background-color);
        position: relative;
        margin: 0 auto;
        z-index: 1;
        padding: 32px;
        border-radius: 2px;

        &__close {
            position: absolute;
            top: 16px;
            right: 16px;
            z-index: 10;

            &:hover {
                cursor: pointer;
            }
        }

        @media (max-width: 900px) {
            position: fixed;
            top: 0;
            left: 0;
            max-height: none;
            max-width: none;
            width: 100%;
            height: 100%;
            padding: 0;
            overflow: auto;
        }
    }
</style>