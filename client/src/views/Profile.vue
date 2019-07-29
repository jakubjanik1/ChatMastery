<template>
    <div class="wrapper" v-if="show">
        <div class="profile">
            <close-icon 
                class="profile__close" 
                @click="close" 
                fillColor="#c3c4c4" 
                :size="30" 
            />
                
        </div>
    </div>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close';

export default {
    name: 'Profile',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    components: {
        CloseIcon
    },
    data() {
        return {
            isVisible: this.show
        };
    },
    methods: {
        close() {
            this.isVisible = false;
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>
    @media (min-width: 900px) {
        .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: #0000003d;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;
        }
    }

    .profile {
        width: 700px;
        height: 700px;
        max-width: 800px;
        max-height: 80%;
        background: #fff;
        position: relative;
        margin: 0 auto;
        z-index: 1;
        padding: 32px;
        border-radius: 2px;

        &__close {
            position: absolute;
            top: 16px;
            right: 16px;

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
        }
    }
</style>
