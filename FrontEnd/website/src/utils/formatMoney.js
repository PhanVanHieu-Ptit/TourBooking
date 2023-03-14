function formatMoney(money) {
    if (!money) return 0;
    return money.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
}

export default formatMoney;
