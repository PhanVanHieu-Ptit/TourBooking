const message = require("../utils/message");
var Tour = require("../models/tour_model");

function seperateString(result) {
  var tours = [];
  result.forEach(function (tour) {
    const image_list = tour.image_list;
    const imgUrl = image_list.split(",");
    tour["imageUrl"] = imgUrl;
    delete tour.image_list;
    tours.push(tour);
  });
  console.log("tours: ", tours);
  return tours;
}
class TourController {
  //[GET] /tour/list
  // list(req, res, next) {
  //   Tour.getAll(function (result) {
  //     res.send(message(result, true, "Thành công!"));
  //   });
  // }

  //[GET] /tour/find?key={key}
  find(req, res, next) {
    var query = require("url").parse(req.url, true).query;
    var key = query.key;

    if (key == undefined) {
      Tour.getAll(function (result) {
        res.send(message(seperateString(result), true, "Thành công!"));
      });
    } else {
      Tour.findBykey(key)
        .then((result) => {
          res.send(message(seperateString(result), true, "Thành công!"));
        })
        .catch((err) => {
          res.send(message(err, false, "Thất bại!"));
        });
    }
  }

  //[GET] /tour/:id/detail
  detail(req, res, next) {
    Tour.getById(req.params.id)
      .then((result) => {
        res.send(message(seperateString(result), true, "Thành công!"));
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
