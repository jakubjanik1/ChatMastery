<template>
     <div class="image-preview" v-if="show" @click="close">
        <div class="image-preview__wrapper">
            <img class="image-preview__img" :src="img" >
            <close-icon class="image-preview__close" @click="close" />
        </div>
    </div>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close';

export default {
    name: 'ImagePreview',
    props: {
        show: Boolean,
        img: String
    },
    components: {
        CloseIcon
    },
    methods: {
        close(event) {
            if (event.target.className != 'image-preview__wrapper') {
                this.$emit('close');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .image-preview {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #00000085;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;

        &__wrapper {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }

        &__img {
            max-width: 90vw;
            max-height: 90vh;
            pointer-events: none;
        }

        &__close {
            position: absolute;
            top: -12px;
            right: -12px;
            color: #fff;
            height: 18px;
            width: 18px;
            cursor: pointer;
            border-radius: 50%;
            background: #009ef7;
            padding: 4px;
            display: flex;
            align-items: center;

            &:hover {
                transition: .3s ease-in-out;
                background: darken(#009ef7, 5%);
            }
        }
    }
</style>
