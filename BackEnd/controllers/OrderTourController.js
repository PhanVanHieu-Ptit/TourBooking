const message = require("../utils/message");

class OrderTourController {
  //[GET] /order-tours/list
  list(req, res, next) {
    res.send(message({ data: "List order" }));
  }

  //[GET] /order-tours/find
  find(req, res, next) {
    res.send(message({ data: "Find order" }));
  }

  //[GET] /order-tours/:id/detail
  detail(req, res, next) {
    res.send(message({ data: "detail order" }));
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

  //[PACTH] /order-tours/:id/order
  order(req, res, next) {
    res.send(message({ data: "order order" }));
  }
}

module.exports = new OrderTourController();
