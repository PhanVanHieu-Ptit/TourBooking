const message = require("../utils/message");
const { getListAddress } = require("../utils/address");
var Status = require("../models/status_model");

class SiteControllers {
  index(req, res) {
    return res.send(message({ data: "Hello world" }));
  }
  async listAddress(req, res) {
    return res.send(message(await getListAddress()));
  }

  // [GET] /status/list-status?type={value}
  listStatus(req, res, next) {
    var query = require("url").parse(req.url, true).query;
    var type = query.type;
    Status.getFollowType(type, function (result) {
      console.log("result: ", result);
      res.send(message(result, true, "Thành công!"));
    });
  }
}

module.exports = new SiteControllers();
