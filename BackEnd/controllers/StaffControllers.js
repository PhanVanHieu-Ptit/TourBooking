const message = require('../utils/message');


class SiteControllers {
  signUp(req, res) {
    console.log(req.body);
    res.send(message([], true, 'Sign-up'));
  }
}

module.exports = new SiteControllers;

