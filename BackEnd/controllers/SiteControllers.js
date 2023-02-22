const message = require('../utils/message');


class SiteControllers {
  index(req, res) {
    res.send(message({ data: 'Hello world' }));
  }
}

module.exports = new SiteControllers;