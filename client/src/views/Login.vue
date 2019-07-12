<template>
    <div class="login">
        <social-button type="github" />
        <social-button type="facebook" />
        <social-button type="twitter" />
        <social-button type="google" />
    </div>
</template>

<script>
import SocialButton from '@/components/SocialButton';

export default {
    name: 'Login',
    components: {
        SocialButton    
    }
}
</script>

<style lang="scss" scoped>

</style>