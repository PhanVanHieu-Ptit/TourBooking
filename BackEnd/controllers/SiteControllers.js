const message = require('../utils/message');
const { getListAddress } = require('../utils/address');

class SiteControllers {
  index(req, res) {
    return res.send(message({ data: 'Hello world' }));
  }
  async listAddress(req, res) {

    return res.send(message(await getListAddress()));
  }
}

module.exports = new SiteControllers;