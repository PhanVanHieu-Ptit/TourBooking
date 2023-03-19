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
  db.query(
    "SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list" +
      " FROM tour" +
      " JOIN tourpicture ON tour.idTour = tourpicture.idTour" +
      " GROUP BY tour.idTour" +
      " ORDER BY tour.dateCreate DESC " +
      "LIMIT 5 OFFSET ?;",
    calculateStart(paging)
  )
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      result(err);
    });
};

Tour.getById = function (id) {
  return db
    .query(
      "SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list" +
        " FROM tour" +
        " JOIN tourpicture ON tour.idTour = tourpicture.idTour" +
        " WHERE tour.idTour = ?" +
        " GROUP BY tour.idTour;",
      [id]
    )
    .then(([rows, fields]) => {
      return rows;
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
  let condition = "";
  if (key)
    condition = `where name like '%${key}%' OR  tourIntro like '%${key}%' or pickUpPoint like '%${key}%' or tourDestination like '%${key}%'`;
  return db
    .query(
      "SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list" +
        " FROM tour" +
        " JOIN tourpicture ON tour.idTour = tourpicture.idTour " +
        condition +
        " GROUP BY tour.idTour" +
        " ORDER BY tour.dateCreate DESC " +
        "LIMIT 5 OFFSET ?;",
      calculateStart(paging)
    )
    .then(([rows, fields]) => {
      console.log("findTourBykey:");
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

Tour.getListFeatured = function (paging) {
  return db
    .query(
      "SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ',') AS image_list" +
        " FROM tour" +
        " JOIN tourpicture ON tour.idTour = tourpicture.idTour " +
        "WHERE featured = 1" +
        " GROUP BY tour.idTour" +
        " ORDER BY tour.dateCreate DESC " +
        "LIMIT 5 OFFSET ?;",
      calculateStart(paging)
    )
    .then(([rows, fields]) => {
      return rows;
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
    .query("SELECT COUNT(*) as number FROM tour WHERE featured =1 ")
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
    .query("SELECT COUNT(*) as number FROM tour")
    .then(([rows, fields]) => {
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = Tour;
