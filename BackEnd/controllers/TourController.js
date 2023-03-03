const message = require("../utils/message");
const connection = require('../utils/connection');
var Tour = require("../models/tour_model");
class TourController {

  //[GET] /tour/find?key={key}
  list(req, res, next) {
    var query = require("url").parse(req.url, true).query;
    var key = query.key || '';
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

  async add(req, res, next) {

    try {

      let [rows, fields] = await connection.execute('select idStaff from staff where email=?', [req.body.email]);
      let idStaffCreate = rows[0].idStaff;
      let { name, startDate, totalDay, minQuantity, maxQuantity, normalPenaltyFee, strictPenaltyFee, minDate,
        tourGuide, tourIntro, tourDetail, pickUpPoint, tourDestination, price, featured, tourPictures } = req.body;


      [rows, fields] = await connection.execute(`INSERT INTO tour(name,startDate,totalDay,minQuantity,maxQuantity,normalPenaltyFee,strictPenaltyFee,minDate,tourGuide,tourIntro,tourDetail,pickUpPoint,tourDestination,price,idStaffCreate,featured)VALUES('${name}','${startDate}',${totalDay},${minQuantity},${maxQuantity},${normalPenaltyFee},${strictPenaltyFee},${minDate},${tourGuide},'${tourIntro}','${tourDetail}','${pickUpPoint}','${tourDestination}',${price},${idStaffCreate},${featured})`)
      tourPictures.forEach(e => {
        connection.execute("insert into tourpicture(idTour,imageUrl) values(?,?)", [rows.insertId, e])
      });
      //get ID staff create  
      return res.send(message({ idTour: rows.insertId }, true, "Thêm tour thành công!"));
    } catch (error) {
      return res.send(message(error, false, "Thêm tour thất bại!"));
    }
  }
}

module.exports = new TourController();
