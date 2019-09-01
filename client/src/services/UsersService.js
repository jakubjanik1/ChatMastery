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
    },
    update(id, user) {
        return Api().put(`/users/${id}`, user);
    },
    forgotPassword(email) {
        return Api().post('/users/forgotPassword', { email });
    },
    resetPassword(token) {
        return Api().get(`/users/resetPassword/${ token }`);
    }
}