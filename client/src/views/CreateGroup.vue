<template>
    <app-modal :show="show" @close="close" class="create-group" :loading="loading">
        <edit-photo :photo="group.image" @change="changePhoto" />

        <app-input
            class="create-group__input"
            placeholder="Group name"
            v-model="group.name"
            :error="errors.groupName"
        />

        <users-select-box 
            class="create-group__input" 
            v-model="group.members" 
            :error="errors.members"
        />

        <app-button class="create-group__button" @click="storeGroup">Create group</app-button>
    </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal';
import AppInput from '@/components/ui/AppInput';
import AppButton from '@/components/ui/AppButton';
import UsersSelectBox from '@/components/create-group/UsersSelectBox';
import { storeGroup, storeMessage } from '@/services/ChatService';
import { uploadImage } from '@/services/UploadService';
import EditPhoto from '@/components/common/EditPhoto';

export default {
    name: 'CreateGroup',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    components: {
        AppModal,
        AppInput,
        AppButton,
        UsersSelectBox,
        EditPhoto
    },
    data() {
        return {
            group: {
                image: 'https://res.cloudinary.com/djc9jias4/image/upload/v1568965385/chatmastery/r5zqvlvyavmlhuyhgaqe.png',
                name: '',
                members: [ this.$root.user ]  
            },
            errors: {},
            loading: false
        };
    },
    methods: {
        changePhoto(image) {
            this.group.image = image;
        },
        async storeImage() {
            if (this.group.image instanceof Object) {
                const response = await uploadImage(this.group.image, 'groups');
                this.group.image = response.data.url;
            }
        },
        async storeGroup() {
            this.loading = true;
            
            await this.storeImage();

            const response = await storeGroup({
                group: true,
                groupName: this.group.name,
                groupImage: this.group.image,
                members: this.group.members.map(member => member._id)
            });

            if (response.data.errors) {
                this.errors = response.data.errors;
            } else {
                await storeMessage({
                    body: {
                        type: 'text',
                        content: 'Welcome in group!'
                    },
                    conversationId: response.data,
                    author: this.$root.user._id
                });

                this.close();
            }

            this.loading = false;
        },
        close() {
            this.group.name = '';
            this.group.members = [ this.$root.user ];
            this.errors = {};

            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-group {
        &__input {
            width: 85%;

            @media (max-width: 900px) {
                &:first-of-type {
                    margin-top: 16px;
                }
            }
        }


       &__button {
            margin: {
                top: 32px;
                bottom: 32px;
            }
        }
    }
</style>