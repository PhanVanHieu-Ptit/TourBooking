const message = require('../utils/message');
const { encode } = require('../utils/my-bcrypt');
const connection = require('../utils/connection');
class StaffController {
  index(req, res) {
    res.send(message([], true, 'Staff'));
  }
  async addStaff(req, res) {
    try {
      const { name, email, password, imageUrl } = req.body;
      let endcodedPassword = encode(password);
      await connection.execute(
        "insert into account values (?,?,?)",
        [email, endcodedPassword, 'staff']
      );
      let [rows, fields] = await connection.execute(
        "insert into staff(name,email,imageUrl) values (?,?,?)",
        [name, email, imageUrl]
      );
      res.send(message({ idStaff: rows.insertId, password }, true, 'Thêm mới nhân viên thành công'));
    } catch (error) {
      res.send(message(error, false, ''));
    }

  }
}

module.exports = new StaffController;

