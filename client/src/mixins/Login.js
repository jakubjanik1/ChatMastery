import AppInput from '@/components/AppInput';

export default {
    components: {
        AppInput
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

            this.$emit('changeTab', tab);
        }
    }
}