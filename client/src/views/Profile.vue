<template>
    <app-modal :show="show" @close="$emit('close')">
        <edit-photo :photo="$root.user.avatar" @change="changePhoto" />

        <app-input 
            class="profile__input" 
            placeholder="Email address" 
            v-model="user.email" 
            :error="errors.email" 
            label 
        />

        <app-input 
            class="profile__input" 
            placeholder="Full name" 
            v-model="user.name" 
            :error="errors.name" 
            label 
        />

        <button class="profile__button" @click="update">Save</button>

        <div class="profile__updating" v-if="isUpdating">
            <loading color="#009ef7" size="47px" />
            <span>Please waiting...</span>
        </div>
    </app-modal>
</template>

<script>
import EditPhoto from '@/components/profile/EditPhoto';
import { uploadImage } from '@/services/UploadService';
import { update } from '@/services/UsersService';
import Loading from 'vue-spinner/src/ClipLoader';
import AppInput from '@/components/ui/AppInput';
import AppModal from '@/components/ui/AppModal';

export default {
    name: 'Profile',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    components: {
        EditPhoto,
        Loading,
        AppInput,
        AppModal
    },
    data() {
        return {
            user: {},
            errors: {},
            isUpdating: false
        };
    },
    methods: {
        changePhoto(image) {
            this.user.avatar = image;
        },
        async uploadImage() {
            if (this.user.avatar instanceof Object) {
                const response = await uploadImage(this.user.avatar, 'users');
                this.user.avatar = response.data.url;
            }
        },
        async update() {
            this.isUpdating = true;

            await this.uploadImage();

            const response = await update(this.user._id, this.user);
            
            if (response.data.errors) {
                this.errors = response.data.errors;
            } else {
                this.$root.user = response.data;
                this.errors = {};
            }

            this.isUpdating = false;
        }
    },
    watch: {
        show() {
            this.errors = {};
            this.user = { ...this.$root.user };

            delete this.user.password;
        }
    }
}
</script>

<style lang="scss" scoped>
    .profile {
        &__input {
            width: 85%;
        }

        &__button {
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

        &__updating {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #ffffffe0;
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
            }
        }
    }
</style>
