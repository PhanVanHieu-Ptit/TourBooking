const message = require('../utils/message');
const connection = require('../utils/connection');
class AccountControllers {
    async update(req, res, next) {
        let {name, phoneNumber, imageUrl, address, email} = req.body;
        try {
            let [rows, fields] = await connection.execute(
                'update  customer set name=?, phoneNumber=?, address=? where email=?',
                [name, phoneNumber, address, email],
            );

            if (imageUrl) {
                await connection.execute('update customer set imageUrl=? where email=?', [imageUrl, email]);
            }
            [rows, fields] = await connection.execute('select * from customer where email=?', [email]);

            return res.send(message(rows[0], true, 'Cập nhật thông tin thành công!'));
        } catch (error) {
            return res.send(message(error, false, 'Cập nhật thông tin thất bại!'));
        }
    }
}
module.exports = new AccountControllers();
