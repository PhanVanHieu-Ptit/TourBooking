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

Tour.getById = function (id) {
  return db
    .query("SELECT * FROM `tour` where idTour= ?", id)
    .then(([rows, fields]) => {
      console.log(rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Tour.findBykey = function (key) {
  return db
    .query(
      "SELECT * FROM `tour` where name like ? OR  tourIntro like ? or tourDetail like ? or pickUpPoint like ? or tourDestination like ?",
      [
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
      ]
    )
    .then(([rows, fields]) => {
      console.log(rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Tour.remove = function (id, result) {
  db.query("DELETE FROM tour WHERE idTour= ?", id)
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

module.exports = Tour;
