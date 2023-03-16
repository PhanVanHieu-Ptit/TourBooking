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
export async function getListTour(searchKey = '') {
    return axios.get('/tour/list?key=' + searchKey);
}
export async function getTour(id) {
    return axios.get(`/tour/${id}/detail`);
}
export async function orderTour(data) {
    return axios.post('/order-tours/order', data);
}
export async function getListOrderTour(id = '', status = '') {
    return axios.get(`/order-tours/list?id=${id}&status=${status}`);
}
export async function getOwnInfor() {
    return axios.get(`/customer/get-own-infor`);
}
export async function changePassword(data) {
    return axios.patch('/account/change-password', data);
}
export async function updateCustomerInfo(data) {
    return axios.post('/customer/update', data);
}
