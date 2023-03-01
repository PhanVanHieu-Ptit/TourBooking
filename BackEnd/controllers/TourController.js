const message = require("../utils/message");
var Tour = require("../models/tour_model");
class TourController {
  //[GET] /tour/find/:key
  find(req, res, next) {
    var key = req.params.key;

    Tour.findBykey(key)
      .then((result) => {
        res.send(message(result, true, "Thành công!"));
      })
      .catch((err) => {
        res.send(message(err, false, "Thất bại!"));
      });
  }

  //[GET] /tour/:id/detail
  detail(req, res, next) {
    Tour.getById(req.params.id)
      .then((result) => {
        res.send(message(result, true, "Thành công!"));
      })
      .catch((err) => {
        res.send(message(err, false, "Thất bại!"));
      });
  }

  //[DELETE] /tour/:id/delete
  delete(req, res, next) {
    var id = req.params.id;
    Tour.remove(id, function (result) {
      res.send(message(result, true, "Xóa thành công!"));
    }).catch((err) => {
      res.send(message(err, false, "Xóa thất bại!"));
    });
  }
}

module.exports = new TourController();
