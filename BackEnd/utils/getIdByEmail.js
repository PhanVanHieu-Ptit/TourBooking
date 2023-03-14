const connection = require('../utils/connection');

async function getId(email) {
    try {
        let [rows, field] = await connection.execute(
            'select(select idCustomer from customer where email = ?) as idCustomer, (select idStaff from staff where email = ?) as idStaff',
            [email, email],
        );
        idCustomer = rows[0].idCustomer;
        idStaff = rows[0].idStaff;
        return {idCustomer, idStaff};
    } catch (error) {
        return undefined;
    }
}

module.exports = getId;
