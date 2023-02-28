const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const route = require('./routes');
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json())
app.use(cors({
  origin: '*',
}));
route(app);


app.listen(3000, () => {
  console.log('listening on *:3000');
});


