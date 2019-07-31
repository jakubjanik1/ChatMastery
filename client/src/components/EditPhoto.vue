<template>
    <div class="edit-photo">
        <img class="edit-photo__preview" :src="url">

        <camera-icon 
            class="edit-photo__edit" 
            fillColor="#fff" 
            :size="18" 
            @click="openFileDialog" 
        />

        <input type="file" ref="photo" @change="changePhoto">
    </div>
</template>

<script>
import CameraIcon from 'vue-material-design-icons/Camera';

export default {
    name: 'EditPhoto',
    props: [ 'photo' ],
    components: {
        CameraIcon
    },
    data() {
        return {
            image: null,
            url: this.photo
        };
    },
    methods: {
        openFileDialog() {
            this.$refs.photo.click();
        },
        async changePhoto(event) {
            this.image = event.target.files[0];
            this.url = URL.createObjectURL(this.image);

            this.$emit('change', this.image);
        }
    }
}
</script>

<style lang="scss" scoped>
     .edit-photo {
        position: relative;
        width: 128px;
        height: 128px;
        margin-top: 16px;

        @media (max-width: 900px) {
            margin-top: 16px + 32px;
        }

        &__preview {
            width: inherit;
            height: inherit;
            border-radius: 50%;
        }

        &__edit {
            content: '';
            width: 16px;
            height: 16px;
            position: absolute;
            bottom: 4px;
            right: 4px;
            background: #009ef7;
            padding: 8px;
            border-radius: 50%;

            &:hover {
                cursor: pointer;
                transition: .3s ease-in-out;
                background: darken(#009ef7, 5%);
            }
        }

        & input[type="file"] {
            display: none;
        }
    }
</style>
