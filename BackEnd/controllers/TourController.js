const message = require("../utils/message");

class TourController {
  //[GET] /tour/find
  find(req, res, next) {
    res.send(message({ data: "Find tour" }));
  }

  //[GET] /tour/:id/detail
  detail(req, res, next) {
    res.send(message({ data: "detail tour" }));
  }
}

module.exports = new TourController();
