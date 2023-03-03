const db = require("../utils/connection");

const OrderTour = function (order) {
  this.idTourOrder = order.idTourOrder;
  this.idCustomer = order.idCustomer;
  this.idTour = order.idTour;
  this.orderDateTime = order.orderDateTime;
  this.quantity = order.quantity;
  this.note = order.note;
  this.totalMoney = order.totalMoney;
  this.cancelDate = order.cancelDate;
  this.idStatus = order.idStatus;
};

OrderTour.getAll = function (result) {
  db.query("SELECT * FROM tourorder")
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.findByStatus = function (status, result) {
  db.query(
    "SELECT * FROM `tourorder` where idStatus = ( SELECT idStatus FROM `status` where name like ? )",
    status
  )
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.getAllFollowCustomer = function (id, result) {
  db.query("SELECT * FROM `tourorder` where idCustomer = ?", id)
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.findByStatusFollowCustomer = function (id, status, result) {
  db.query(
    "SELECT * FROM `tourorder` where idCustomer = ? and idStatus = ( SELECT idStatus FROM `status` where name like ? )",
    [id, status]
  )
    .then(([rows, fields]) => {
      result(rows);
    })
    .catch((err) => {
      console.log;
      result(err);
    });
};

OrderTour.getById = function (id) {
  return db
    .query("SELECT * FROM `tourorder` where idTourOrder= ?", id)
    .then(([rows, fields]) => {
      console.log("rows: ", rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

OrderTour.findBykey = function (key) {
  return db
    .query(
      "SELECT * FROM `tourorder` where " +
        " idTour = (SELECT idTour FROM `tour` where name like ? OR  tourIntro like ? or tourDetail like ? or pickUpPoint like ? or tourDestination like ?) " +
        "or idCustomer = (SELECT idCustomer FROM `customer` where name like ? or email like ? or phoneNumber like ? or address like ?)",
      [
        key,
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
        "%" + key + "%",
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

OrderTour.create = function (data, result) {
  db.query("INSERT INTO tourorder SET ?", data)
    .then(([rows, fields]) => {
      console.log(rows);
      result({ id: rows.idTourOrder, ...data });
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
};

OrderTour.update = function (data, result) {
  db.query(
    "UPDATE tourorder SET  quantity=?, note=?, totalMoney=? where idTourOrder=?",
    [data.quantity, data.note, data.totalMoney, data.idTourOrder]
  )
    .then(([rows, fields]) => {
      console.log(rows);
      result(data);
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
};

OrderTour.confirm = function (id, idStatus) {
  return db
    .query("UPDATE tourorder SET  idStatus=? where idTourOrder=?", [
      idStatus,
      id,
    ])
    .then(([rows, fields]) => {
      console.log(rows);
      return rows;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = OrderTour;
