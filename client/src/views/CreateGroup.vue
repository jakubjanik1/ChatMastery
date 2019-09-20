<template>
    <app-modal :show="show" @close="$emit('close')" class="create-group"> 
        <app-input
            class="create-group__input"
            placeholder="Group name"
            v-model="form.groupName"
            :error="errors.groupName"
        />

        <users-select-box 
            class="create-group__input" 
            v-model="form.members" 
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
        UsersSelectBox
    },
    data() {
        return {
            form: {
                groupName: '',
                members: [ this.$root.user ]  
            },
            errors: {}
        };
    },
    methods: {
        async storeGroup() {
            const response = await storeGroup({
                group: true,
                groupName: this.form.groupName,
                groupImage: 'https://res.cloudinary.com/djc9jias4/image/upload/v1568965385/chatmastery/r5zqvlvyavmlhuyhgaqe.png',
                members: this.form.members
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

                this.$emit('close');
            }
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
            margin-top: 134px;
        }
    }
</style>