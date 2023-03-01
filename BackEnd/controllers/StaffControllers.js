const message = require('../utils/message');


class StaffController {
  index(req, res) {
    res.send(message([], true, 'Staff'));
  }
  addStaff(req, res) {
    const { name, email } = req.body;


    res.send(message({ name, email }, true, 'Thêm mới nhân viên thành công'));
  }
}

module.exports = new StaffController;

