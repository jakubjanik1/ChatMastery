<template>
    <div class="overlay" v-if="show">
        <div class="modal">
            <close-icon 
                class="modal__close" 
                @click="close" 
                fillColor="#c3c4c4" 
                :size="30"
                title=""
                v-icon-hover 
            />

            <slot />

            <div class="modal__loading" v-if="loading">
                <loading color="#009ef7" size="47px" />
                <span>Please waiting...</span>
            </div>
        </div>
    </div>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close';
import Loading from 'vue-spinner/src/ClipLoader';

export default {
    name: 'AppModal',
    components: {
        CloseIcon,
        Loading
    },
    props: [ 'show', 'loading' ],
    methods: {
        close() {
            if (! this.loading) {
                this.$emit('close');
            }
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

        &__loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: var(--primary-background-color);
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;

            & > span {
                font: {
                    size: 16px;
                    weight: 600
                }
                margin-top: 6px;
                color: var(--primary-text-color);
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