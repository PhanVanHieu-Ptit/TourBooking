const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const route = require('./routes');



route(app);
app.use(express.json());
app.use(cors({
  origin: '*',
}));
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', async (req, res) => {
  const connection = require('./utils/connection');
  const [rows, fields] = await connection.execute('select * from status');
  console.log(rows);
  res.send(rows)
})


app.listen(3000, () => {
  console.log('listening on *:3000');
});