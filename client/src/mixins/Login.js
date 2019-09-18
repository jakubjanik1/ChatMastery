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
    }
}