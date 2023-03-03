const message = require("../utils/message");
var OrderTour = require("../models/order_tour_model");
var Tour = require("../models/tour_model");
var Customer = require("../models/customer_model");
var Status = require("../models/status_model");

function getInforTour(res, result) {
  const tourPromises = [];
  const customerPromises = [];
  const statusPromises = [];

  // Loop through each tour order and call Tour.getById() for its ID
  result.forEach((tourOrder) => {
    tourPromises.push(Tour.getById(tourOrder.idTour));
    customerPromises.push(Customer.getById(tourOrder.idCustomer));
    statusPromises.push(Status.getById(tourOrder.idStatus, "tourorder"));
  });

  Promise.all([
    Promise.all(tourPromises),
    Promise.all(customerPromises),
    Promise.all(statusPromises),
  ])
    .then(([tourResponses, customerResponses, statusResponse]) => {
      // Loop through each tour order and add its tour information to the response
      let tourOrders = result.map((tourOrder, index) => {
        tourOrder["tour"] = tourResponses[index][0];
        tourOrder["customer"] = customerResponses[index][0];
        tourOrder["status"] = statusResponse[index][0];
        return tourOrder;
      });

      tourOrders = result.map((tourOrder, index) => {
        delete tourOrder.idTour;
        delete tourOrder.idCustomer;
        delete tourOrder.idStatus;
        return tourOrder;
      });

      // Send the response with the tour orders and their tour information
      res.send(message(tourOrders, true, "Thành công!"));
    })
    .catch((err) => {
      res.send(message(err, false, "Thất bại!"));
    });
}

class OrderTourController {
  //[GET] /order-tours/list?status={value}
  filter(req, res, next) {
    var query = require("url").parse(req.url, true).query;

    var id = query.id;
    var status = query.status;

    switch (id) {
      case undefined:
        if (status == "Tất cả" || status == undefined) {
          OrderTour.getAll(function (result) {
            getInforTour(res, result);
          });
        } else {
          OrderTour.findByStatus(status, function (result) {
            getInforTour(res, result);
          });
        }
        break;
      default:
        if (status == "Tất cả" || status == undefined) {
          OrderTour.getAllFollowCustomer(id, function (result) {
            getInforTour(res, result);
          });
        } else {
          OrderTour.findByStatusFollowCustomer(id, status, function (result) {
            getInforTour(res, result);
          });
        }
    }
  }

  //[GET] /order-tours/list
  // list(req, res, next) {
  //   OrderTour.get_all(function (result) {
  //     res.send(message(result, true, "Thành công!"));
  //   });
  //   // .catch((err) => {
  //   //   res.send(message(err, false, "Thất bại!"));
  //   // });
  // }

  //[GET] /order-tours/find?key={key}
  find(req, res, next) {
    var query = require("url").parse(req.url, true).query;
    var key = query.key;

    OrderTour.findBykey(key)
      .then((result) => {
        getInforTour(res, result);
      })
      .catch((err) => {
        res.send(message(err, false, "Thất bại!"));
      });
  }

  //[GET] /order-tours/:id/detail
  detail(req, res, next) {
    OrderTour.getById(req.params.id)
      .then((result) => {
        getInforTour(res, result);
      })
      .catch((err) => {
        res.send(message(err, false, "Thất bại!"));
      });
  }

  //[POST] /order-tours/:id/order
  order(req, res, next) {
    var data = req.body;
    OrderTour.create(data, function (result) {
      res.send(message(result, true, "Thành công!"));
    });
    // .catch((err) => {
    //   res.send(message(err, false, "Thất bại!"));
    // });
  }

  //[PUT] /order-tours/:id/update
  update(req, res, next) {
    var data = req.body;
    OrderTour.update(data, function (result) {
      res.send(message(result, true, "Cập nhật thành công!"));
    });
    // .catch((err) => {
    //   res.send(message(err, false, "Cập nhật thất bại!"));
    // });
  }

  //[PACTH] /order-tours/:id/confirm-using
  confirmUsing(req, res, next) {
    OrderTour.confirm(req.params.id, 13)
      .then(() => {
        OrderTour.getById(req.params.id)
          .then((result) => {
            res.send(message(result, true, "Cập nhật thành công!"));
          })
          .catch((err) => {
            res.send(message(err, false, "Cập nhật thất bại!"));
          });
      })
      .catch((err) => {
        res.send(message(err, false, "Cập nhật thất bại!"));
      });
  }

  //[PACTH] /order-tours/:id/confirm-cancel
  // using cancel
  // confirmCancel(req, res, next) {
  //   OrderTour.confirm(req.params.id, 12)
  //     .then(() => {
  //       OrderTour.getById(req.params.id)
  //         .then((result) => {
  //           res.send(message(result, true, "Cập nhật thành công!"));
  //         })
  //         .catch((err) => {
  //           res.send(message(err, false, "Cập nhật thất bại!"));
  //         });
  //     })
  //     .catch((err) => {
  //       res.send(message(err, false, "Cập nhật thất bại!"));
  //     });
  // }

  //[PACTH] /order-tours/:id/confirm
  confirm(req, res, next) {
    OrderTour.confirm(req.params.id, 10)
      .then(() => {
        OrderTour.getById(req.params.id)
          .then((result) => {
            res.send(message(result, true, "Cập nhật thành công!"));
          })
          .catch((err) => {
            res.send(message(err, false, "Cập nhật thất bại!"));
          });
      })
      .catch((err) => {
        res.send(message(err, false, "Cập nhật thất bại!"));
      });
  }

  //[PACTH] /order-tours/:id/cancel
  cancel(req, res, next) {
    OrderTour.confirm(req.params.id, 12)
      .then(() => {
        OrderTour.getById(req.params.id)
          .then((result) => {
            res.send(message(result, true, "Cập nhật thành công!"));
          })
          .catch((err) => {
            res.send(message(err, false, "Cập nhật thất bại!"));
          });
      })
      .catch((err) => {
        res.send(message(err, false, "Cập nhật thất bại!"));
      });
  }

  //[PACTH] /order-tours/:id/customer-cancel
  //using cancel
  // customerCancel(req, res, next) {
  //   res.send(message({ data: "customerCancel order" }));
  // }

  //[PACTH] /order-tours/:id/customer-need-cancel
  customerNeedCancel(req, res, next) {
    OrderTour.confirm(req.params.id, 11)
      .then(() => {
        OrderTour.getById(req.params.id)
          .then((result) => {
            res.send(message(result, true, "Cập nhật thành công!"));
          })
          .catch((err) => {
            res.send(message(err, false, "Cập nhật thất bại!"));
          });
      })
      .catch((err) => {
        res.send(message(err, false, "Cập nhật thất bại!"));
      });
  }
}

module.exports = new OrderTourController();
