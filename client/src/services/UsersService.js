import Api from './Api';

export default {
    search(name) {
        return Api().get(`/users/search/${name}`);
    },
    fetchLoggedInUser() {
        return Api().get('/users/me', { withCredentials: true });
    },
    signup(user) {
        return Api().post('/users/signup', user);
    },
    login(user) {
        return Api().post('/users/login', user, { withCredentials: true });
    }
}