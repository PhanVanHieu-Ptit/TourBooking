import moment from 'moment';
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
export { formatDate, formatMoney, formatDateWithHour };
