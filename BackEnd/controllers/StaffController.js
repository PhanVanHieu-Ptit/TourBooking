const message = require('../utils/message');


class StaffController {
  index(req, res) {
    res.send(message([], true, 'Staff'));
  }
}

module.exports = new StaffController;

