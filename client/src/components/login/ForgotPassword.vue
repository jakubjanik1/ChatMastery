<template>
    <form class="login__form" :class="isActive" method="POST">
        <div class="login__title">Recover your password</div>
        <div class="login__subtitle">
            Enter your email to receive password reset instructions
        </div>

        <app-input 
            class="login__input" 
            v-model="form.email" 
            placeholder="Email address" 
            :error="error"
            v-show="! recoveryEmailSent"
            :disabled="recoveryEmailIsSending"
        />
        
        <button 
            class="login__button" 
            @click="forgotPassword" 
            v-show="! recoveryEmailSent"
            :disabled="recoveryEmailIsSending"
        >
            Recover your password
            <load-icon 
                class="login__button--loading" 
                size="14px" 
                color="#fff" 
                :loading="recoveryEmailIsSending" 
            />
        </button>

        <div class="login__info" v-show="recoveryEmailSent">Recovery email sent</div>

        <span class="login__link" @click="changeTab('Login')">Already have an account?</span>
        <span class="login__link" @click="changeTab('Signup')">Don’t have an account?</span>
    </form>
</template>

<script>
import UsersService from '@/services/UsersService';
import LoadIcon from 'vue-spinner/src/ClipLoader';
import LoginMixin from '@/mixins/Login';

export default {
    name: 'ForgotPassword',
    components: {
        LoadIcon
    },
    mixins: [ LoginMixin ],
    data() {
        return {
            form: {
                email: ''
            },
            error: '',
            recoveryEmailSent: false,
            recoveryEmailIsSending: false
        }
    },
    methods: {
        async forgotPassword() {
            this.error = '';

            try {
                this.recoveryEmailIsSending = true;
                const response = await UsersService.forgotPassword(this.form.email);

                this.recoveryEmailSent = true;
            } catch (error) {
                this.error = error.response.data;
            } finally {
                this.recoveryEmailIsSending = false;
            }
        },
        clear() {
            this.form.email = '';
            this.error = '';
            this.recoveryEmailSent = false;
        }
    }
}
</script>