const calculateStart = require("../utils/calculateStart");
const db = require("../utils/connection");

const Tour = function (tour) {
  this.idTour = tour.idTour;
  this.name = tour.name;
  this.idStatus = tour.idStatus;
  this.startDate = tour.startDate;
  this.totalDay = tour.totalDay;
  this.minQuantity = tour.minQuantity;
  this.maxQuantity = tour.maxQuantity;
  this.normalPenaltyFee = tour.normalPenaltyFee;
  this.strictPenaltyFee = tour.strictPenaltyFee;
  this.minDate = tour.minDate;
  this.dateCreate = tour.dateCreate;
  this.tourGuide = tour.tourGuide;
  this.tourIntro = tour.tourIntro;
  this.tourDetail = tour.tourDetail;
  this.pickUpPoint = tour.pickUpPoint;
  this.tourDestination = tour.tourDestination;
  this.price = tour.price;
  this.idStaffCreate = tour.idStaffCreate;
  this.idStaffCancel = tour.idStaffCancel;
  this.featured = tour.featured;
};

Tour.getAll = function (paging, result) {
  db.query("call managetour.sp_get_all_tour(1); ", calculateStart(paging))
    .then(([rows, fields]) => {
      result(rows[0]);
    })
    .catch((err) => {
      result(err);
    });
};

Tour.getById = function (id) {
  return db
    .query("call managetour.sp_get_tour_by_id(1);", [id])
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Tour.getSlotsLeft = function (id) {
  return db
    .query("call managetour.sp_get_tour_slots_left(?);", id)
    .then(([rows, fields]) => {
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Tour.findBykey = function (key, paging) {
  return db
    .query("call managetour.sp_get_tour_by_key(?, ?);", [
      key,
      calculateStart(paging),
    ])
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Tour.getListFeatured = function (paging) {
  return db
    .query("call managetour.sp_get_tour_feauted(?);", [calculateStart(paging)])
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Tour.remove = function (id, result) {
  db.query("delete from tourpicture where idTour=?", id)
    .then(([rows1, fields1]) => {
      db.query("DELETE FROM tour WHERE idTour= ?", id)
        .then(([rows, fields]) => {
          result(rows);
        })
        .catch((err) => {
          result(err);
        });
    })
    .catch((err) => {
      result(err);
    });
};

Tour.getNumberTourFeatured = function () {
  return db
    .query("SELECT * FROM managetour.v_tour_number_featured;")
    .then(([rows, fields]) => {
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Tour.getNumberTour = function () {
  return db
    .query("SELECT * FROM managetour.v_tour_number;")
    .then(([rows, fields]) => {
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = Tour;
