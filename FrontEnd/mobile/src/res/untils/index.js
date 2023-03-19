import moment from 'moment';
import { AppContext } from '../../../App';
import React, { useState, useContext } from 'react';
const { setHistoryOrder, setToursOutStanding, setToursComming, setListTour, setListOrder, setListStaff } =
    useContext(AppContext);
function formatDate(date) {
    return moment(date).format('DD/MM/yyyy');
}
function formatDateWithHour(date) {
    return moment(date).format('DD/MM/yyyy HH:mm:ss');
}
function formatMoney(money) {
    const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    console.log(formatter.format(money));
    return formatter.format(money);
}

function clearOldData() {
    setHistoryOrder([]);
    setToursOutStanding([]);
    setToursComming([]);
    setListTour([]);
    setListOrder([]);
    setListStaff([]);
}
export { formatDate, formatMoney, formatDateWithHour, clearOldData };
