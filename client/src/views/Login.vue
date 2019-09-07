<template>
    <div class="login">
        <img class="login__logo" src="logo_light.png">

        <div class="login__wrapper" ref="wrapper" @submit.prevent>
            <forgot-password @changeTab="changeTab" :active="activeTab" />
            <signup @changeTab="changeTab" :active="activeTab" />
            <login @changeTab="changeTab" :active="activeTab" />
            <reset-password @changeTab="changeTab" :active="activeTab" />
        </div>
    </div>
</template>

<script>
import ForgotPassword from '@/components/login/ForgotPassword';
import Signup from '@/components/login/Signup';
import Login from '@/components/login/Login';
import ResetPassword from '@/components/login/ResetPassword';

export default {
    components: {
        ForgotPassword,
        Signup,
        Login,
        ResetPassword
    },
    data() {
        return {
            activeTab: 'Login'
        };
    },
    created() {
        if (window.location.pathname.match(/^\/users\/resetPassword\/.*$/)) {
            this.activeTab = 'ResetPassword';
        }
    },
    methods: {
        changeTab(tab) {
            this.activeTab = tab;
        }
    }
}
</script>

<style lang="scss">
    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--secondary-background-color);
        box-sizing: border-box;
        height: calc((var(--vh, 1vh) * 100));
        overflow: auto;

        &__logo {
            margin: 40px 0;
        }

        &__wrapper {
            background: var(--primary-background-color);
            max-width: 550px;
            width: 100%;
            overflow: hidden;
            min-height: 552px;
            position: relative;
            box-shadow: 0 3px 5px rgba(0,0,0,.05);
            border-radius: 2px;
            margin: 0 40px 40px 40px;
        }

        &__form {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            padding: 40px;
            width: 100%;
            box-sizing: border-box;
            transition: all .5s ease;
            opacity: 0;
            transform: translateX(-100%);

            &--active {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }
        }

        &__title {
            font-weight: bold;
            font-size: 20px;
            color: var(--primary-text-color);
        }

        &__subtitle {
            margin-top: 8px;
            color: var(--primary-text-color);
            text-align: center;
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
            background: var(--primary-background-color);
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
            margin-top: 40px;
            display: flex;
            justify-content: center;
            
            &:focus {
                outline: 0;
            }

            &:hover {
                transition: .3s ease-in-out;
                cursor: pointer;
                background: darken(#3399FF, 5%);
            }

            &--loading {
                height: 18px;
                margin-left: 16px;
            }
        }

        &__info {
            font: {
                size: 20px;
                weight: 600
            }
            color: #c3c4c4;
            margin-top: 24px;
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

            &__form {
                margin: 0 0 40px 0;
                padding: 20px;
            }

            &__wrapper {
                min-height: 512px;
            }

            &__logo {
                margin: 26px 0;
            }
        }

        @media (max-width: 560px) {
            &__wrapper {
                min-height: 592px;
            }
        }
    }
</style>