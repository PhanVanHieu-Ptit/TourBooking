require("dotenv").config();
const mysql = require("mysql2");

const env = process.env;

const connection2 = mysql.createConnection({
  host: env.DB_URI,
  database: env.DB_NAME,
  user: env.DB_UNAME,
  password: env.DB_UPASS,
});

connection2.connect(function (err) {
  if (err) console.log("Connecttion to mysql fail!");
});

module.exports = connection2;
