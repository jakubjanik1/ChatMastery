<template>
    <app-modal :show="show" @close="$emit('close')" class="create-group"> 
        <app-input
            class="create-group__input"
            placeholder="Group name"
            v-model="form.groupName"
        />

        <users-select-box class="create-group__input" />
    </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal';
import AppInput from '@/components/ui/AppInput';
import UsersSelectBox from '@/components/create-group/UsersSelectBox';

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
        UsersSelectBox
    },
    data() {
        return {
            form: {
                groupName: ''
            }
        };
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
    }
</style>