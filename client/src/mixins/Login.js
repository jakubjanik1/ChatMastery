import AppInput from '@/components/ui/AppInput';
import AppButton from '@/components/ui/AppButton';

export default {
    components: {
        AppInput,
        AppButton
    },
    props: [ 'active' ],
    computed: {
        isActive() {
            return this.$options.name == this.active ? 'login__form--active' : '';
        }
    },
    methods: {
        changeTab(tab) {
            this.clear();
            history.replaceState('ChatMastery', 'ChatMastery', '/');

            this.$emit('changeTab', tab);
        }
    },
    watch: {
        errors: {
            handler(newValue) {
                if (Object.entries(newValue).length) {
                    setTimeout(() => {
                        this.$parent.$refs.wrapper.style['min-height'] = `${ this.$parent.$refs.wrapper.scrollHeight }px`;
                    }, 0);
                } else {
                    this.$parent.$refs.wrapper.style['min-height'] = '';
                }
            },
            deep: true
        }
    }
}