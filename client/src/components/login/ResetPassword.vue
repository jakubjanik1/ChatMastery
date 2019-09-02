<template>
    <form class="login__form" :class="isActive" method="POST">
        <div class="login__title">Reset your password</div>
        <div class="login__subtitle" v-show="! error">Enter your new password below</div>

        <app-input 
            class="login__input" 
            v-model="form.password" 
            placeholder="Password"
            type="password"
            :error="errors.password"
            v-show="! error"
        />

        <app-input 
            class="login__input" 
            v-model="form.repeatedPassword" 
            placeholder="Repeat password"
            type="password"
            :error="errors.repeatedPassword"
            v-show="! error"
        />
        
        <button class="login__button" v-show="! error" @click="updatePassword">Reset your password</button>

        <div class="login__info" v-show="error">{{ error }}</div>
        <div class="login__link" @click="changeTab('ForgotPassword')" v-show="error">Send reset email again?</div>
        <div class="login__link" @click="changeTab('Login')" v-show="error">Return home?</div>
    </form>
</template>

<script>
import LoginMixin from '@/mixins/Login';
import UsersService from '@/services/UsersService';

export default {
    name: 'ResetPassword',
    mixins: [ LoginMixin ],
    data() {
        return {
            form: {
                password: '',
                repeatedPassword: ''
            },
            error: '',
            errors: {},
            token: '',
            email: ''
        };
    },
    async created() {
        if (this.active != 'ResetPassword') return;

        this.token = window.location.pathname.split('/').pop();

        try {
            const response = await UsersService.resetPassword(this.token);

            this.email = response.data;
        } catch (error) {
            this.error = error.response.data;
        }
    },
    methods: {
        clear() {
            this.form.password = this.form.repeatedPassword = '';
            this.error = this.token = this.email = '';
        },
        async updatePassword() {
            const { email, token, form: { password, repeatedPassword } } = this.$data;
            const response = await UsersService.updatePassword({ email, token, password, repeatedPassword });

            if (response.data.errors) {
                this.errors = response.data.errors;
            } else {
                this.clear();
                
                this.changeTab('Login');
            }
        }
    }
}
</script>