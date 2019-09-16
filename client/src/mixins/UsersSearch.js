import UsersService from '@/services/UsersService';

export default {
    data() {
        return {
            name: '',
            foundUsers: []
        };
    },
    methods: {
        async searchUser() {
            if (this.name == '') {
                this.foundUsers = [];
                return;
            }

            const response = await UsersService.search(this.name);
            this.foundUsers = response.data;
        }
    }
}