<<<<<<< HEAD

const siteRouter = require('./site.routes');
const accountRouter = require('./account.routes');
=======
const siteRouter = require("./site.routes");
const tourRouter = require("./tour.routes");
const orderRouter = require("./order.routes");
>>>>>>> 63c8d759e8559a500747ce0fd4d0e9be1bc0af3b

function hung(app) {
  //viet route trong nay
  app.use('/account', accountRouter);
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
