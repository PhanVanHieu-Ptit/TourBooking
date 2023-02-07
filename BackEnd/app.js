const express = require('express');
const app = express();


//config socket
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*' }
});


var device = [0, 0, 0, 0, 0];
var log = [];
io.on('connection', (socket) => {
  var ID = device.indexOf(0);
  if (ID == -1) {
    socket.disconnect()
    return;
  }
  device[ID] = 1;
  socket.ID = ID;
  console.log('a user connected: ' + socket.ID);
  socket.on('disconnected', () => {
    console.log('a user disconnect: ' + socket.ID);
    device[socket.ID] = 0;
  });
  socket.emit('assignID', socket.ID); //gui cho may moi ket noi ID cua no
  socket.on('startVote', () => {
    io.emit('notifiCodinator', `START: Node ${socket.ID} tổ chức bầu cử!`)
    console.log(`START: Node ${socket.ID} tổ chức bầu cử!`);
    let k = 0;
    for (k = socket.ID; k < 5; k++) {
      //neu cac may lon hon deu bi tat
      if (!device.slice(k).includes(1)) {
        k -= 1;
        break;
      }
      if (device[k] == 0) {
        continue;
      }

      for (let i = k + 1; i < 5; i++) {
        if (device[i] != 0) {
          log.push(`Node ${k} gửi thông điệp Election(${k}) cho Node ${i}`)
        }
      }
      for (let i = k + 1; i < 5; i++) {
        if (device[i] != 0) {
          log.push(`Node ${i} gửi thông điệp OK(${i}) cho Node ${k}`)
        }
      }
    }
    if (k == 5) {
      k -= 1;
    }
    log.push(`FINALLY: Node điều khiển hiện tại: ${k}`);
    for (var i = k - 1; i >= 0; i--) {
      if (device[i] != 0) {
        log.push(`Node ${k} gửi thông điệp Victory Coodinator(${k}) cho Node ${i}`)
      }
    }
    log.forEach((e, i) => {
      setTimeout(() => {
        console.log(e);
        io.emit('notifiCodinator', e)
      }, i * 3000)
    });
  });
});
const path = require('path');

const publicPath = path.join(__dirname, "./public/");

app.use(express.static(publicPath));
const cors = require("cors");
app.use(cors({
  origin: '*',
}));


app.get('/', (req, res) => {
  res.send('Hello')
})
// listend on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});