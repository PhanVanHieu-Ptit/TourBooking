const siteRouter = require("./site.routes");
const tourRouter = require("./tour.routes");
const orderRouter = require("./order.routes");
const accountRouter = require("./account.routes");
const staffRouter = require("./staff.routes");
const customerRouter = require("./customer.routes");

function hung(app) {
  //viet route trong nay
  app.use("/account", accountRouter);
  app.use("/staff", staffRouter);
  app.use("/customer", customerRouter);
}

function hieu(app) {
  //viet route trong nay
  app.use("/tour", tourRouter);
  // app.use(middleware.authenticateToken);
  app.use("/order-tours", orderRouter);
}

function route(app) {
  hung(app);
  hieu(app);

  //API chung
  app.use("/site", siteRouter);
  app.use("/", (req, res) => {
    res.send("Hello");
  });
}

module.exports = route;
