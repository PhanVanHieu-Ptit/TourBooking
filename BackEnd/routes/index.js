
const siteRouter = require('./site.routes');
const accountRouter = require('./account.routes');

function hung(app) {
  //viet route trong nay
  app.use('/account', accountRouter);
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