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
export async function getListTour(searchKey = '', paging = 1) {
    return axios.get(`/tour/list?key=${searchKey}&paging=${paging}`);
}
export async function getTour(id) {
    return axios.get(`/tour/${id}/detail`);
}
export async function orderTour(data) {
    return axios.post('/order-tours/order', data);
}
export async function getListOrderTour(id = '', status = 'Tất cả') {
    return axios.get(`/order-tours/list?id=${id}&status=${status}`);
}
export async function getOwnInfor() {
    return axios.get(`site/get-own-infor`);
}
export async function changePassword(data) {
    return axios.patch('/account/change-password', data);
}
export async function updateCustomerInfo(data) {
    return axios.post('/customer/update', data);
}
export async function updateStaffInfo(data, id) {
    return axios.put(`/staff/${id}/update`, data);
}
export async function getListStaff(key = '') {
    return axios.get(`/staff/list?key=${key}`);
}
export async function addStaff(data) {
    return axios.post('/staff/add', data);
}
export async function updateStaff(data, idStaff) {
    return axios.put(`/staff/${idStaff}/update`, data);
}
export async function updateTour(data, idTour) {
    return axios.put(`/tour/${idTour}/update`, data);
}
export async function requestCancelTour(idTourOrder) {
    return axios.patch(`/order-tours/${idTourOrder}/customer-need-cancel`);
}
export async function addTour(data) {
    return axios.post('/tour/add', data);
}
