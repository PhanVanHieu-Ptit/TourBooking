import moment from 'moment';
function formatDate(date) {
    return moment(date).format('DD/MM/yyyy');
}
function formatMoney(money) {
    const formatter = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' });
    console.log(formatter.format(money));
    return formatter.format(money);
}
export { formatDate, formatMoney };
