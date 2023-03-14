const connection = require('../utils/connection');

async function getTotalMoney(idTour, quantity) {
    try {
        const [rows, field] = await connection.execute('select price from tour where idTour =?', [idTour]);
        return rows[0].price * quantity;
    } catch (error) {
        console.log(error);
    }
}

module.exports = getTotalMoney;
