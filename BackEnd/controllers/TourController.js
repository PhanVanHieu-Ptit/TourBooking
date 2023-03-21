const message = require("../utils/message");
const connection = require("../utils/connection");
const seperateString = require("../utils/seperateString");
var Tour = require("../models/tour_model");
var Picture = require("../models/picturetour_model");

function getImageTour(res, result) {
  if (!result.length) return res.send(message(result, false, ""));
  const picturePromises = [];

  // Loop through each tour order and call Tour.getById() for its ID
  // console.log('result: ', result);
  result.forEach((tour) => {
    picturePromises.push(Picture.getByIdTour(tour.idTour));
  });

  Promise.all(picturePromises)
    .then((pictureResponses) => {
      // Loop through each tour order and add its tour information to the response
      let pictureResponse = result.map((tour, index) => {
        tour["tourpictures"] = pictureResponses[index];
        return tour;
      });

      // Send the response with the tour orders and their tour information
      res.send(message(pictureResponse, true, "Thành công!"));
    })
    .catch((err) => {
      res.send(message(err, false, "Thất bại!"));
    });
}

function getSlotsLeftTour(res, result) {
  const tourPromises = [];
  // Loop through each tour order and call Tour.getById() for its ID
  result.forEach((tour) => {
    tourPromises.push(Tour.getSlotsLeft(tour.idTour));
  });

  Promise.all(tourPromises)
    .then((tourResponses) => {
      console.log("tourResponses: ", tourResponses);
      let tours = result.map((tour, index) => {
        tour["slotsLeft"] = tourResponses[index][0][0].slotLeft;
        return tour;
      });

      res.send(message(tours, true, "Thành công!"));
    })

    .catch((err) => {
      res.send(message(err, false, "Thất bại!"));
    });
}

class TourController {
  //[GET] /tour/list?key={key}&paging={paging}
  list(req, res, next) {
    var query = require("url").parse(req.url, true).query;
    var key = query.key | "";
    const paging = query.paging || 1;

    if (key == undefined) {
      Tour.getAll(paging, function (result) {
        // console.log(result);
        // res.send(message(seperateString(result), true, "Thành công!"));
        getSlotsLeftTour(res, seperateString(result));
      });
    } else if (key == "featured") {
      Tour.getListFeatured(paging)
        .then((result) => {
          // getImageTour(res, result);
          //   res.send(message(seperateString(result), true, "Thành công!"));
          getSlotsLeftTour(res, seperateString(result));
        })
        .catch((err) => {
          res.send(message(err, false, "Thất bại!"));
        });
    } else {
      Tour.findBykey(key, paging)
        .then((result) => {
          // getImageTour(res, result);
          //   res.send(message(seperateString(result), true, "Thành công!"));
          getSlotsLeftTour(res, seperateString(result));
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
        // res.send(message(seperateString(result), true, "Thành công!"));
        getSlotsLeftTour(res, seperateString(result));
      })
      .catch((err) => {
        res.send(message(err, false, "Thất bại!"));
      });
  }

  //[DELETE] /tour/:id/delete
  delete(req, res, next) {
    var id = req.params.id;
    Tour.changeStatus(id, "2", function (result, status, mess) {
      res.send(message(result, status, mess));
    });
  }

  //[POST] /tour/add
  async add(req, res, next) {
    try {
      let [rows, fields] = await connection.execute(
        "call managetour.sp_get_staff_by_email(?);",
        [req.body.email]
      );
      let idStaffCreate = rows[0][0].idStaff;
      let {
        name,
        startDate,
        totalDay,
        minQuantity,
        maxQuantity,
        normalPenaltyFee,
        strictPenaltyFee,
        minDate,
        tourGuide,
        tourIntro,
        tourDetail,
        pickUpPoint,
        tourDestination,
        detailPickUpPoint,
        detailTourDestination,
        price,
        featured,
        tourPictures,
      } = req.body;

      [rows, fields] = await connection.execute(
        `INSERT INTO tour(name,startDate,totalDay,minQuantity,maxQuantity,normalPenaltyFee,strictPenaltyFee,minDate,tourGuide,tourIntro,tourDetail,pickUpPoint,tourDestination,detailPickUpPoint,detailTourDestination,price,idStaffCreate,featured) VALUES('${name}','${startDate}',${totalDay},${minQuantity},${maxQuantity},${normalPenaltyFee},${strictPenaltyFee},${minDate},${tourGuide},'${tourIntro}','${tourDetail}','${pickUpPoint}','${tourDestination}','${detailPickUpPoint}','${detailTourDestination}',${price},${idStaffCreate},${featured})`
      );
      console.log("rows: ", rows);
      tourPictures.forEach((e) => {
        connection.execute("call managetour.sp_add_image_tour(?, ?);", [
          rows.insertId,
          e,
        ]);
      });
      return res.send(
        message({ idTour: rows.insertId }, true, "Thêm tour thành công!")
      );
    } catch (error) {
      console.log(error);
      return res.send(message(error, false, "Thêm tour thất bại!"));
    }
  }
  async update(req, res, next) {
    const idTour = req.params.id;
    try {
      let {
        name,
        startDate,
        totalDay,
        minQuantity,
        maxQuantity,
        normalPenaltyFee,
        strictPenaltyFee,
        minDate,
        tourGuide,
        tourIntro,
        tourDetail,
        pickUpPoint,
        tourDestination,
        detailPickUpPoint,
        detailTourDestination,
        price,
        featured,
        tourPictures,
      } = req.body;
      await connection.execute("call managetour.sp_delete_image_tour(?);", [
        idTour,
      ]);
      tourPictures.forEach((imageUrl) => {
        connection.execute("call managetour.sp_add_image_tour(?, ?);", [
          idTour,
          imageUrl,
        ]);
      });
      let [rows, fields] = await connection.execute(
        "call managetour.sp_update_tour(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          name,
          startDate,
          totalDay,
          minQuantity,
          maxQuantity,
          normalPenaltyFee,
          strictPenaltyFee,
          minDate,
          tourGuide,
          tourIntro,
          tourDetail,
          pickUpPoint,
          tourDestination,
          detailPickUpPoint,
          detailTourDestination,
          price,
          featured,
          idTour,
        ]
      );

      if (rows[1].changedRows < 1)
        return res.send(message(rows, true, "Không có thay đổi!"));
      return res.send(message(rows[0], true, "Cập nhật tour thành công"));
    } catch (error) {
      console.log(error.message);
      return res.send(message(error, false, "Cập nhật tour tour thất bại!"));
    }
  }
}

module.exports = new TourController();
