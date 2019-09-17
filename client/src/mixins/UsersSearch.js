import { search } from '@/services/UsersService';

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

            const response = await search(this.name);
            this.foundUsers = response.data;
        }
    }
}