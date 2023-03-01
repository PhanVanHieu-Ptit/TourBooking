const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const env = process.env;
const dbConfig = {
  host: env.DB_URI,
  database: env.DB_NAME,
  user: env.DB_UNAME,
  password: env.DB_UPASS,
};
const connection = mysql.createPool(dbConfig).promise();

module.exports = connection;
