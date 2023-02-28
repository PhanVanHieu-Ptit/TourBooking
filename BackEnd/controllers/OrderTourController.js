const message = require("../utils/message");
var OrderTour = require("../models/order_tour_model");

class OrderTourController {
  //[GET] /order-tours/list
  list(req, res, next) {
    OrderTour.get_all(function (result) {
      res.send(message({ data: result }));
    });
  }

  //[GET] /order-tours/find
  find(req, res, next) {
    res.send(message({ data: result }));
  }

  //[GET] /order-tours/:id/detail
  detail(req, res, next) {
    var result = OrderTour.getById(req.params.id);
    res.send(message({ data: result }));
  }

  //[POST] /order-tours/:id/order
  order(req, res, next) {
    var data = req.body;
    OrderTour.create(data, function (result) {
      res.send(message({ result }));
    });
  }

  //[PUT] /order-tours/:id/update
  update(req, res, next) {
    var data = req.body;
    OrderTour.update(data, function (result) {
      res.send(message({ result }));
    });
  }

  //[PACTH] /order-tours/:id/confirm-using
  confirmUsing(req, res, next) {
    res.send(message({ data: "confirmUsing order" }));
  }

  //[PACTH] /order-tours/:id/confirm-cancel
  confirmCancel(req, res, next) {
    res.send(message({ data: "confirmCancel order" }));
  }

  //[PACTH] /order-tours/:id/confirm
  confirm(req, res, next) {
    res.send(message({ data: "confirm order" }));
  }

  //[PACTH] /order-tours/:id/cancel
  cancel(req, res, next) {
    res.send(message({ data: "cancel order" }));
  }

  //[PACTH] /order-tours/:id/customer-cancel
  customerCancel(req, res, next) {
    res.send(message({ data: "customerCancel order" }));
  }

  //[PACTH] /order-tours/:id/customer-need-cancel
  customerNeedCancel(req, res, next) {
    res.send(message({ data: "customerNeedCancel order" }));
  }
}

module.exports = new OrderTourController();
