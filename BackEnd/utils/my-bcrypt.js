const bcrypt = require('bcryptjs');
const salt = 10;

function encode(password) {
    let encodedPass = bcrypt.hashSync(password, salt);
    return encodedPass;
}
function compare(unencodedPassword, encodedPassword) {
    return bcrypt.compareSync(unencodedPassword, encodedPassword);
}

module.exports = {
    encode,
    compare,
};
