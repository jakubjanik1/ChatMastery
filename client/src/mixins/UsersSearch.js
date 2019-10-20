import { search } from '@/services/UsersService';
import { take } from 'lodash';

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

            this.foundUsers = response.data.filter(({ _id }) => _id != this.$root.user._id);
            this.foundUsers = take(this.foundUsers, 10);
        }
    }
}