<template>
     <form class="login__form" :class="isActive" method="POST">
        <div class="login__title">Sign up for free!</div>

        <app-input 
            class="login__input" 
            v-model="form.email" 
            placeholder="Email address" 
            :error="errors.email" 
        />

        <app-input 
            class="login__input" 
            v-model="form.name" 
            placeholder="Full name" 
            :error="errors.name" 
        />

        <app-input 
            class="login__input" 
            v-model="form.password" 
            placeholder="Password" 
            :error="errors.password" 
            type="password"
        />

        <app-input 
            class="login__input" 
            v-model="form.repeatedPassword" 
            placeholder="Repeat password" 
            :error="errors.repeatedPassword" 
            type="password"
        />
        
        <app-button class="login__button" @click="signup">Sign up with email</app-button>
        <span class="login__link" @click="changeTab('Login')">Already have an account?</span>
    </form>
</template>

<script>
import LoginMixin from '@/mixins/Login';
import { signup } from '@/services/UsersService';

export default {
    name: 'Signup',
    mixins: [ LoginMixin ],
    data() {
        return {
            form: {
                email: '',
                name: '',
                password: '',
                repeatedPassword: ''
            },
            errors: {},
        };
    },
    methods: {
        async signup() {
            const response = await signup(this.form);
            
            if (response.data.errors) {
                this.errors = response.data.errors;
            } else {
                this.clear();
                this.changeTab('Login');
            }
        },
        clear() {
            this.form.name = this.form.email = 
            this.form.password = this.form.repeatedPassword = '';

            this.errors = {};
        }
    }
}
</script>