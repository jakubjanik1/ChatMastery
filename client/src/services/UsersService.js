import Api from './Api';

export default {
    search(name) {
        return Api().get(`/users/search/${name}`);
    },
    fetchLoggedInUser() {
        return Api().get('/users/me', { withCredentials: true });
    }
}