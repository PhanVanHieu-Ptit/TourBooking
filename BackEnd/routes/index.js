const siteRouter = require("./site.routes");
const tourRouter = require("./tour.routes");
const orderRouter = require("./order.routes");

function hung() {
  //viet route trong nay
}

function hieu(app) {
  //viet route trong nay
  app.use("/tour", tourRouter);
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
