const db = require('../utils/connection');

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

Tour.getAll = function (result) {
    db.query('SELECT * FROM tour')
        .then(([rows, fields]) => {
            result(rows);
        })
        .catch((err) => {
            console.log;
            result(err);
        });
};

Tour.getById = function (id) {
    return db
        .query('SELECT * FROM tour WHERE tour.idTour = ?', id)
        .then(([rows, fields]) => {
            console.log('findTourByID:' + rows.lenght);
            return rows;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

Tour.findBykey = function (key) {
    let condition = '';
    if (key)
        condition = `where name like '%${key}%' OR  tourIntro like '%${key}%' or pickUpPoint like '%${key}%' or tourDestination like '%${key}%'`;
    return db
        .query(
            "SELECT tour.*, GROUP_CONCAT(tourpicture.imageUrl SEPARATOR ', ') AS image_list" +
                ' FROM tour' +
                ' JOIN tourpicture ON tour.idTour = tourpicture.idTour ' +
                condition +
                ' GROUP BY tour.idTour;',
        )
        .then(([rows, fields]) => {
            console.log('findTourBykey:' + rows.lenght);
            return rows;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

Tour.remove = function (id, result) {
    db.query('DELETE FROM tour WHERE idTour= ?', id)
        .then(([rows, fields]) => {
            result(rows);
        })
        .catch((err) => {
            console.log;
            result(err);
        });
};

module.exports = Tour;
