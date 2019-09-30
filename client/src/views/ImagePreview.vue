<template>
     <div class="image-preview" v-if="show" @click="onClickOutside">
        <div class="image-preview__wrapper">
            <img class="image-preview__img" :src="img" >

            <close-icon class="image-preview__close" @click="close" />

            <download-icon class="image-preview__download" @click="download" />
        </div>
    </div>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close';
import DownloadIcon from 'vue-material-design-icons/Download';
import { saveAs } from 'file-saver';

export default {
    name: 'ImagePreview',
    props: {
        show: Boolean,
        img: String
    },
    components: {
        CloseIcon,
        DownloadIcon
    },
    methods: {
        onClickOutside(event) {
            if (! event.composedPath().filter(el => el.className == 'image-preview__wrapper').length) {
                this.$emit('close');
            }
        },
        close() {
            this.$emit('close');
        },
        download() {
            saveAs(this.img);
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
            max-height: calc(var(--vh, 1vh) * 90);
            pointer-events: none;
        }

        %image-link {
            position: absolute;
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

        &__close {
            @extend %image-link;
            top: -12px;
            right: -12px;
        }

        &__download {
            @extend %image-link;
            bottom: 12px;
            left: calc(50% - 13px);
        }
    }
</style>
