const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const route = require("./routes");
const route = require('./routes');
const bodyParser = require('body-parser')

// cấu hình body-paser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/public")));
app.use(
  cors({
    origin: "*",
  })
);
route(app);


// app.get("/", async (req, res) => {
//   const connection = require("./utils/connection");
//   const [rows, fields] = await connection.execute("select * from status");
//   console.log(rows);
//   res.send(rows);
// });

app.listen(3000, () => {
  console.log("listening on *:3000");
});



