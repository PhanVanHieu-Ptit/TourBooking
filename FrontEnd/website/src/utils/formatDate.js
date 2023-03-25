function formatDate(date) {
    if (!date) return '';
    if (date.includes('.000Z')) {
        date = date.replace('T', ' ').replace('.000Z', '');
    }
    return [date, ...date.split(' ')];
}

export default formatDate;
