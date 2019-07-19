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
                <social-button type="twitter" />
                <social-button type="google" />
            </div>

            <div class="login__line">
                <span class="login__or">or</span>
            </div>

            <div class="login__control">
                <input class="login__input" placeholder="Email address" v-model="loginForm.email">
                <span class="login__focus-border"></span>
            </div>
            <div class="login__control">
                <input class="login__input" type="password" placeholder="Password" v-model="loginForm.password">
                <span class="login__focus-border"></span>
            </div>

            <div class="login__error login__error--login" v-show="loginError">{{ loginError }}</div>
            
            <button class="login__button" @click="login">Login with email</button>
        </form>

        <form class="login__wrapper" @submit.prevent v-else>
            <div class="login__title">Sign up for free!</div>

            <div class="login__control">
                <input 
                    class="login__input" 
                    :class="{ 'login__input--error' : signupErrors.email }" 
                    placeholder="Email address" 
                    v-model="signupForm.email"
                >

                <span class="login__focus-border"></span>
            </div>
            <div class="login__error" v-show="signupErrors.email">{{ signupErrors.email }}</div>

            <div class="login__control">
                <input 
                    class="login__input" 
                    :class="{ 'login__input--error' : signupErrors.name }"
                    placeholder="Full name" 
                    v-model="signupForm.name"
                >
                <span class="login__focus-border"></span>
            </div>
             <div class="login__error" v-show="signupErrors.name">{{ signupErrors.name }}</div>

            <div class="login__control">
                <input 
                    class="login__input" 
                    :class="{ 'login__input--error' : signupErrors.password }" 
                    type="password" 
                    placeholder="Password" 
                    v-model="signupForm.password"
                >

                <span class="login__focus-border"></span>
            </div>
            <div class="login__error" v-show="signupErrors.password">{{ signupErrors.password }}</div>
            
            <button class="login__button" @click="signup">Sign up with email</button>
            <span class="login__link" @click="toggleForm">Already have an account?</span>
        </form>
    </div>
</template>

<script>
import SocialButton from '@/components/SocialButton';
import UsersService from '@/services/UsersService';

export default {
    name: 'Login',
    components: {
        SocialButton    
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
                this.signupErrors = response.data.errors.reduce((obj, item) => {
                    obj[item.param] = item.msg;
                    return obj;
                }, {});
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

        &__control {
            position: relative;
            width: 100%;
        }

        &__input {
            border: 0;
            border-bottom: 2px solid #c3c4c4;
            padding: 8px 0;
            margin-top: 32px;
            width: 100%;

            &:focus {
                outline: 0;
            }

            &--error {
                border-bottom-color: #f44336;
            }
        }

        &__input ~ &__focus-border {
            position: absolute; 
            bottom: 0; 
            left: 0; 
            width: 0; 
            height: 2px; 
            background: #3399FF; 
            transition: .4s;
        }

        &__input:focus ~ &__focus-border {
            width: 100%;
            transition: .4s;
        }

        &__input--error:focus ~ &__focus-border {
            width: 0%;
            transition: .4s;
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

            &--login {
                align-self: center;
                margin-top: 18px;
            }
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

        & input, button {
            font-family: inherit;
        }

        & input {
            font-size: 14px;
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