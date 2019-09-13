<template>
    <app-modal :show="show" @close="$emit('close')"> 
        Create group
    </app-modal>
</template>

<script>
import AppModal from '@/components/ui/AppModal';

export default {
    name: 'CreateGroup',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    components: {
        AppModal
    }
}
</script>

<style lang="scss" scoped>
    
</style>