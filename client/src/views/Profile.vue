<template>
    <app-modal :show="show" @close="$emit('close')" :loading="isUpdating">
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

        <app-button class="profile__button" @click="update">Save</app-button>        
    </app-modal>
</template>

<script>
import EditPhoto from '@/components/common/EditPhoto';
import { uploadImage } from '@/services/UploadService';
import { update } from '@/services/UsersService';
import AppInput from '@/components/ui/AppInput';
import AppModal from '@/components/ui/AppModal';
import AppButton from '@/components/ui/AppButton'

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
        AppInput,
        AppModal,
        AppButton
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
            margin-bottom: 32px;
        }

       
    }
</style>
