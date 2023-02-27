const db = require("../utils/connection2");

const OrderTour = function (order) {
  this.idCustomer = order.idCustomer;
  this.idTour = order.idTour;
  this.orderDateTime = order.orderDateTime;
  this.quantity = order.quantity;
  this.note = order.note;
  this.totalMoney = order.totalMoney;
  this.cancelDate = order.cancelDate;
  this.idStatus = order.idStatus;
};

OrderTour.get_all = function (result) {
  db.query("SELECT * FROM `tourorder`", function (err, order) {
    if (err) {
      result(null);
    } else {
      result(order);
    }
  });
};

OrderTour.getById = function (id) {
  db.query("SELECT * FROM `tourorder` where id= ?", id, function (err, order) {
    if (err) {
      return err;
    } else {
      return order;
    }
  });
};

OrderTour.create = function (data, result) {
  result(data);
};

OrderTour.update = function (data, result) {
  result(data);
};

module.exports = OrderTour;
