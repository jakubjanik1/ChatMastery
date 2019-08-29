<template>
    <div class="app-input">
        <div class="app-input__control">
            <div class="app-input__label" v-if="label">{{ placeholder }}</div>

            <input 
                :value="value"
                class="app-input__input"
                :class="{ 'app-input__input--error' : error }"
                :placeholder="getPlaceholder"
                :type="inputType"
                :disabled="disabled"
                @input="$emit('input', $event.target.value)"
            >

            <span class="app-input__focus-border"></span>

            <div 
                class="app-input__toggle-password" 
                v-if="type == 'password'" 
                @click="togglePasswordVisibility"
                v-icon-hover
            >
                <show-icon v-if="showPassword" fillColor="#c3c4c4" :size="22" />
                <hide-icon v-else fillColor="#c3c4c4" :size="22" />
            </div>
        </div>
        <div class="app-input__error" v-show="error">{{ error }}</div>
    </div>
</template>

<script>
import ShowIcon from 'vue-material-design-icons/EyeOutline';
import HideIcon from 'vue-material-design-icons/EyeOffOutline';

export default {
    name: 'AppInput',
    props: {
        type: { 
            type: String,
            default: 'text',
        },
        placeholder: String,
        value: String,
        error: String,
        label: { 
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ShowIcon, 
        HideIcon
    },
    data() {
        return {
            showPassword: false,
            inputType: this.type
        };
    },
    computed: {
        getPlaceholder() {
            return this.label ? '' : this.placeholder;
        }
    },
    methods: {
        togglePasswordVisibility(event) {
            this.showPassword = ! this.showPassword;

            this.inputType = this.showPassword ? 'text' : 'password';
        }
    }
}
</script>

<style lang="scss" scoped>
    .app-input {
        width: 100%;

        &__control {
            position: relative;
        }

        &__label {
            margin-top: 32px;
            margin-bottom: 4px;
            font-weight: 600;
        }

        &__input {
            border: 0;
            border-bottom: 2px solid #c3c4c4;
            padding: 8px 0;
            width: 100%;
            margin-top: 32px;
            font: {
                family: inherit;
                size: 14px;
            }

            .app-input__label ~ & {
                margin-top: 0;
            }

            &:focus {
                outline: 0;
            }

            &--error {
                border-bottom-color: #f44336;
            }
            
            &:disabled {
                background: inherit;
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

        &__error {
            color: #f44336;
            align-self: flex-start;
            margin-top: 12px;
        }

        &__toggle-password {
            position: absolute;
            bottom: 4px;
            right: 8px;
            cursor: pointer;
        }
    }
</style>
