import {axios} from './axiosConfig';

export async function signIn(data) {
    return axios.post('/account/sign-in', data);
}
export async function signUp(data) {
    return axios.post('/account/sign-up', data);
}
export async function forgotPassword(data) {
    return axios.post('/account/forgot-password', data);
}
export async function getListAddress() {
    return axios.get('/site/list-address');
}
export async function getListTour() {
    return axios.get('/tour/list');
}
export async function getTour(id) {
    return axios.get(`/tour/${id}/detail`);
}
