import Api from './Api';
const api = Api('users');

export default {
    search(name) {
        return api.get(`/search/${name}`);
    },

    fetchLoggedInUser() {
        return api.get('/me', { withCredentials: true });
    },

    signup(user) {
        return api.post('/signup', user);
    },

    login(user) {
        return api.post('/login', user, { withCredentials: true });
    },

    update(id, user) {
        return api.put(`/${id}`, user);
    },

    forgotPassword(email) {
        return api.post('/forgotPassword', { email });
    },

    resetPassword(token) {
        return api.get(`/resetPassword/${ token }`);
    },
    
    updatePassword(data) {
        return api.post('/updatePassword', data);
    } 
}