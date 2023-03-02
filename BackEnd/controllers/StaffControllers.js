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
      res.send(message(error, false, error.message));
    }
  }
  async updateStaff(req, res) {
    try {

      const idStaff = req.params.id;
      const { name, imageUrl } = req.body;
      let [rows, fields] = await connection.execute(
        "update staff set name=?,imageUrl=? where idStaff = ?",
        [name, imageUrl, idStaff]
      );
      if (rows.affectedRows < 1) {
        return res.send(message(rows, false, 'Không tìm thấy nhân viên có id:' + idStaff));
      }
      if (rows.changedRows < 1)
        return res.send(message(rows, false, 'Không có thay đổi!'));
      return res.send(message(rows, true, 'Cập nhật nhân viên thành công'));
    } catch (error) {
      res.send(message(error, false, error.message));
    }
  }
  async toggleAccountStatus(req, res) {
    try {

      const idStaff = req.params.id;
      let [rows, fields] = await connection.execute(
        "select * from staff where idStaff = ?",
        [idStaff]
      );
      if (rows.length == 0) {
        return res.send(message(rows, false, 'Không tìm thấy nhân viên có id:' + idStaff));
      }
      if (rows[0].email == req.body.email) {
        return res.send(message('', false, 'Không thể tự khóa tài khoản!'));
      }

      //5 = unlock, 7 = locked
      //toggle new status depending on current status
      let newStatus = 5;
      if (rows[0].idStatus == 5) {
        newStatus = 7;
      }
      [rows, fields] = await connection.execute(
        "update staff set idStatus =? where idStaff = ?",
        [newStatus, idStaff]
      );
      if (newStatus == 5)
        return res.send(message(true, true, 'Đã mở khóa tài khoản!'));
      if (newStatus == 7)
        return res.send(message(false, true, 'Đã khóa tài khoản!'));
    } catch (error) {
      res.send(message(error, false, error.message));
    }
  }
}

module.exports = new StaffController;

