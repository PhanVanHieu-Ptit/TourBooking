const message = require("../utils/message");
var Tour = require("../models/tour_model");
class TourController {
  //[GET] /tour/find
  find(req, res, next) {
    res.send(message({ data: "Find tour" }));
  }

  //[GET] /tour/:id/detail
  detail(req, res, next) {
    res.send(message({ data: "detail tour" }));
  }

  //[DELETE] /tour/:id/delete
  delete(req, res, next) {
    var id = req.params.id;
    Tour.remove(id, function (result) {
      res.send(message({ data: result }));
    });
  }
}

module.exports = new TourController();
