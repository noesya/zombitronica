const Zombitron = require("./Zombitron")
const zombitronica = new Zombitron();

zombitronica.app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/music.html');
});

zombitronica.app.get('/slider', function (req, res) {
  res.sendFile(__dirname + '/views/slider.html');
});

zombitronica.app.get('/sequencer', function (req, res) {
  res.sendFile(__dirname + '/views/sequencer.html');
});

zombitronica.app.get('/position', function (req, res) {
  res.sendFile(__dirname + '/views/position.html');
});

zombitronica.app.get('/controller', function (req, res) {
  res.sendFile(__dirname + '/views/potentiometers_3.html');
});

zombitronica.socketServer.on('connection', (socket) => {
  socket.on('slider0', (v) => {
    zombitronica.socketServer.emit('slider0', v);
  });
  socket.on('slider1', (v) => {
    zombitronica.socketServer.emit('slider1', v);
  });
  socket.on('slider2', (v) => {
    zombitronica.socketServer.emit('slider2', v);
  });
  socket.on('slider3', (v) => {
    zombitronica.socketServer.emit('slider3', v);
  });

  socket.on('position', (v) => {
    zombitronica.socketServer.emit('position', v);
  });

  socket.on('dial1', (v) => {
    zombitronica.socketServer.emit('dial1', v);
  });

  socket.on('dial2', (v) => {
    zombitronica.socketServer.emit('dial2', v);
  });

  socket.on('dial3', (v) => {
    zombitronica.socketServer.emit('dial3', v);
  });

  socket.on('sequencer', (v) => {
    zombitronica.socketServer.emit('sequencer', v);
  });
});

zombitronica.start();