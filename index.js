const Zombitron = require("./Zombitron");
const zombitronica = new Zombitron(https = true); 

zombitronica.app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

zombitronica.app.get('/keyboard', function (req, res) {
  res.sendFile(__dirname + '/views/keyboard.html');
});

zombitronica.app.get('/sequencer', function (req, res) {
  res.sendFile(__dirname + '/views/sequencer.html');
});

zombitronica.app.get('/position', function (req, res) {
  res.sendFile(__dirname + '/views/position.html');
});

zombitronica.app.get('/controller', function (req, res) {
  res.sendFile(__dirname + '/views/controller.html');
});

zombitronica.app.get('/motion', function (req, res) {
  res.sendFile(__dirname + '/views/motion.html');
});

zombitronica.socketServer.on('connection', (socket) => {
  socket.on('sequencer', (data) => {
    zombitronica.socketServer.emit('sequencer', data);
  });
  socket.on('keyboard', (data) => {
    zombitronica.socketServer.emit('keyboard', data);
  });
  socket.on('controller1', (data) => {
    zombitronica.socketServer.emit('controller1', data);
  });
  socket.on('controller2', (data) => {
    zombitronica.socketServer.emit('controller2', data);
  });
  socket.on('controller3', (data) => {
    zombitronica.socketServer.emit('controller3', data);
  });
  socket.on('controller4', (data) => {
    zombitronica.socketServer.emit('controller4', data);
  });
  socket.on('position', (data) => {
    zombitronica.socketServer.emit('position', data);
  });
  socket.on('dial-motion', (beta) => {
    zombitronica.socketServer.emit('dial-motion', beta);
  });
});

zombitronica.start();