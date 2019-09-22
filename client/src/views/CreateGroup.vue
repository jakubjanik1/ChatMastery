<template>
    <app-modal :show="show" @close="close" class="create-group"> 
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
            group: {
                name: '',
                members: [ this.$root.user ]  
            },
            errors: {}
        };
    },
    methods: {
        async storeGroup() {
            const response = await storeGroup({
                group: true,
                groupName: this.group.name,
                groupImage: 'https://res.cloudinary.com/djc9jias4/image/upload/v1568965385/chatmastery/r5zqvlvyavmlhuyhgaqe.png',
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
                top: 160px;
                bottom: 16px;
            }
        }
    }
</style>