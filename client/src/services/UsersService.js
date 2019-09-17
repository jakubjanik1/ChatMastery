import Api from './Api';
const api = Api('users');

export function search(name) {
    return api.get(`/search/${name}`);
}

export function fetchLoggedInUser() {
    return api.get('/me', { withCredentials: true });
}

export function signup(user) {
    return api.post('/signup', user);
}

export function login(user) {
    return api.post('/login', user, { withCredentials: true });
}

export function update(id, user) {
    return api.put(`/${id}`, user);
}

export function forgotPassword(email) {
    return api.post('/forgotPassword', { email });
}

export function resetPassword(token) {
    return api.post('/resetPassword', { token });
}

export function updatePassword(data) {
    return api.post('/updatePassword', data);
} 