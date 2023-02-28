require('dotenv').config()
const mysql = require('mysql2');


const env = process.env
const dbConfig = {
  host: env.DB_URI,
  database: env.DB_NAME,
  user: env.DB_UNAME,
  password: env.DB_UPASS
};
const connection = mysql.createPool(
  dbConfig
).promise();


// demo
// const [rows, fields] = await connection.execute('select * from status');
// console.log(rows);
// res.send(rows)

module.exports = connection;