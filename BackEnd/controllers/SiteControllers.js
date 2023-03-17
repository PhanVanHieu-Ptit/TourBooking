const message = require("../utils/message");
const { getListAddress } = require("../utils/address");
var Status = require("../models/status_model");
var Tour = require("../models/tour_model");
const connection = require("../utils/connection");

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
  async getOwnInfor(req, res) {
    let { email } = req.body;
    try {
      let rows, fields;
      if (req.body.role == "customer")
        [rows, fields] = await connection.execute(
          "select * from customer where email = ?",
          [email]
        );
      else
        [rows, fields] = await connection.execute(
          "select * from staff where email = ?",
          [email]
        );

      return res.send(message(rows[0], true, ""));
    } catch (error) {
      return res.send(message("", false, error.message));
    }
  }

  // [GET] /site/number-tour
  numberTour(req, res) {
    var query = require("url").parse(req.url, true).query;
    var type = query.type;
    if (type == "featured") {
      Tour.getNumberTourFeatured()
        .then((result) => {
          res.send(message(result, true, "Thành công!"));
        })
        .catch((err) => {
          res.send(message(err, false, "Thất bại!"));
        });
    } else {
      Tour.getNumberTour()
        .then((result) => {
          res.send(message(result, true, "Thành công!"));
        })
        .catch((err) => {
          res.send(message(err, false, "Thất bại!"));
        });
    }
  }
}

module.exports = new SiteControllers();
