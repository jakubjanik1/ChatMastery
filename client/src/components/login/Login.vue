<template>
    <form class="login__form" :class="isActive" method="POST">
        <div class="login__title">Login to your account</div>
        <div class="login__subtitle">
            Don’t have an account? 
            <span class="login__link" @click="changeTab('Signup')">Sign Up Free!</span>
        </div>

        <div class="login__social">
            <social-button type="github" />
            <social-button type="facebook" />
            <social-button type="spotify" />
            <social-button type="google" />
        </div>

        <div class="login__line">
            <span class="login__or">or</span>
        </div>

        <app-input 
            class="login__input" 
            v-model="form.email" 
            placeholder="Email address" 
        />
        <app-input 
            class="login__input" 
            v-model="form.password" 
            placeholder="Password" 
            type="password"
        />

        <div class="login__error" v-show="error">{{ error }}</div>
        
        <button class="login__button" @click="login">Login with email</button>

        <span class="login__link" @click="changeTab('ForgotPassword')">Forgot password?</span>
    </form>
</template>

<script>
import SocialButton from '@/components/login/SocialButton';
import LoginMixin from '@/mixins/Login';
import { login } from '@/services/UsersService';

export default {
    name: 'Login',
    mixins: [ LoginMixin ],
    components: {
        SocialButton
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            error: ''  
        };
    },
    methods: {
        clear() {
            this.form.email = this.form.password = '';

            this.error = '';
        },
        async login() {
            const response = await login(this.form);

            if (response.data.error) {
                this.error = response.data.error;
            } else {
                this.error = '';
                location.reload();
            } 
        }
    }
}
</script>