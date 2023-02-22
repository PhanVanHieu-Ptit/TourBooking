
const siteRouter = require('./site.routes');

function hung() {
  //viet route trong nay
}

function hieu() {
  //viet route trong nay
}

function route(app) {
  hung(app);
  hieu(app)


  //API chung
  app.use('/site', siteRouter);
  app.use('/', (req, res) => { res.send("Hello") });

}


module.exports = route;