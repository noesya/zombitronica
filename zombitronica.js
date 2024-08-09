const Zombitron = require("./src/Zombitron")
const zombitronica = new Zombitron();

zombitronica.app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/zombitronica.html');
});

zombitronica.app.get('/master', function (req, res) {
  res.sendFile(__dirname + '/views/master.html');
});

zombitronica.app.get('/monotron', function (req, res) {
  res.sendFile(__dirname + '/views/monotron.html');
});

zombitronica.app.get('/effects', function (req, res) {
  res.sendFile(__dirname + '/views/effects.html');
});

zombitronica.socketServer.on('connection', (socket) => {
  socket.on('message', (msg) => {
    zombitronica.socketServer.emit(msg.id, msg.value);
  });
});

zombitronica.start();