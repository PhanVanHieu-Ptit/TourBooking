function message(data = [], status = true, message = '') {
    if (!Array.isArray(data)) {
        data = [data];
    }
    if (typeof status != 'boolean') throw new Error('status must be a boolean');
    if (typeof message != 'string') throw new Error('message must be a string');

    return {status, message, data};
}

module.exports = message;
