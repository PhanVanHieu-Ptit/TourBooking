const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const route = require("./routes");

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


app.listen(process.env.PORT, () => {
  console.log("listening on :", process.env.PORT);
});

