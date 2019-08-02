<template>
    <div class="login">
        <img class="login__logo" src="@/assets/logo.png">

        <form class="login__wrapper" @submit.prevent v-if="showLoginForm">
            <div class="login__title">Login to your account</div>
            <div class="login__subtitle">
                Don’t have an account? 
                <span class="login__link" @click="toggleForm">Sign Up Free!</span>
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
                v-model="loginForm.email" 
                placeholder="Email address" 
            />
            <app-input 
                class="login__input" 
                v-model="loginForm.password" 
                placeholder="Password" 
                type="password"
            />

            <div class="login__error" v-show="loginError">{{ loginError }}</div>
            
            <button class="login__button" @click="login">Login with email</button>
        </form>

        <form class="login__wrapper" @submit.prevent v-else>
            <div class="login__title">Sign up for free!</div>

            <app-input 
                class="login__input" 
                v-model="signupForm.email" 
                placeholder="Email address" 
                :error="signupErrors.email" 
            />

            <app-input 
                class="login__input" 
                v-model="signupForm.name" 
                placeholder="Full name" 
                :error="signupErrors.name" 
            />

            <app-input 
                class="login__input" 
                v-model="signupForm.password" 
                placeholder="Password" 
                :error="signupErrors.password" 
                type="password"
            />
            
            <button class="login__button" @click="signup">Sign up with email</button>
            <span class="login__link" @click="toggleForm">Already have an account?</span>
        </form>
    </div>
</template>

<script>
import SocialButton from '@/components/SocialButton';
import UsersService from '@/services/UsersService';
import AppInput from '@/components/AppInput';

export default {
    name: 'Login',
    components: {
        SocialButton,
        AppInput
    },
    data() {
        return {
            showLoginForm: true,
            signupForm: {
                email: '',
                name: '',
                password: ''
            },
            signupErrors: {},
            loginForm: {
                email: '',
                password: ''
            },
            loginError: ''
        };
    },
    methods: {
        async signup() {
            const response = await UsersService.signup(this.signupForm);
            
            if (response.data.errors) {
                this.signupErrors = response.data.errors;
            } else {
                this.clearSignupForm();
                this.showLoginForm = true;
            }
        },
        clearSignupForm() {
            this.signupForm.name = '';
            this.signupForm.email = '';
            this.signupForm.password = '';

            this.signupErrors = {};
        },
        toggleForm() {
            this.showLoginForm = !this.showLoginForm;

            this.clearSignupForm();
            this.clearLoginForm();
        },
        clearLoginForm() {
            this.loginForm.email = '';
            this.loginForm.password = '';

            this.loginError = '';
        },
        async login() {
            const response = await UsersService.login(this.loginForm);

            if (response.data.error) {
                this.loginError = response.data.error;
            } else {
                this.loginError = '';
                location.reload();
            } 
        }
    }
}
</script>

<style lang="scss" scoped>
    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f6f6f6;
        box-sizing: border-box;
        height: calc((var(--vh, 1vh) * 100));
        overflow: auto;

        &__logo {
            margin: 40px 0;
        }

        &__wrapper {
            background: #fff;
            padding: 40px;
            margin: 0 40px 40px 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 2px;
            max-width: 550px;
            min-height: 510px;
            width: 100%;
            box-sizing: border-box;
            box-shadow: 0 3px 5px rgba(0,0,0,.05);
        }

        &__title {
            font-weight: bold;
            font-size: 20px;
            color: #292929;
        }

        &__subtitle {
            margin-top: 8px;
            color: #292929;
        }

        &__social {
            display: grid;
            grid-template-areas: "button button button button";
            margin: 16px 0;

            @media (max-width: 560px) {
                grid-template-areas: "button button" 
                                     "button button";
            }
        }

        &__line {
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #c3c4c4;
            height: 13px;
        }

        &__or {
            background: #fff;
            color: #c3c4c4;
            padding: 0 16px;
            font-size: 20px;
        }

        &__button {
            background: #3399FF; 
            color: #fff;
            font-weight: 600;
            font-size: 16px;
            border: 0;
            border-radius: 2px;
            padding: 10px 16px;
            width: 100%;
            margin-top: 50px;

            &:focus {
                outline: 0;
            }

            &:hover {
                transition: .3s ease-in-out;
                cursor: pointer;
                background: darken(#3399FF, 5%);
            }
        }

        &__error {
            color: #f44336;
            align-self: flex-start;
            margin-top: 12px;
            align-self: center;
            margin-top: 18px;
        }

        &__link {
            color: #3399FF;
            margin-top: 24px;
            font-weight: 600;
            cursor: pointer;

            &:hover {
                transition: .3s ease-in-out;
                cursor: pointer;
                color: darken(#3399FF, 5%);
            }
        }

        &__button {
            font-family: inherit;
        }

        @media (max-width: 700px) {
            padding: 0 16px;

            &__wrapper {
                margin: 0 0 40px 0;
                padding: 20px;
                min-height: 470px;
            }

            &__logo {
                margin: 26px 0;
            }
        }

        @media (max-width: 560px) {
            &__wrapper {
                min-height: 550px;
            }
        }
    }
</style>