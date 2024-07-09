const { networkInterfaces, hostname } = require('os');

const port = 3000;

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt')
};

const express = require('express');
var app = express();

const server = https.createServer(options, app);

const { Server } = require("socket.io");
const io = new Server(server);

const nets = networkInterfaces();
const hostnames = ["localhost", "*"];
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      hostnames.push(net.address);
    }
  }
}

app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/keyboard', function (req, res) {
  res.sendFile(__dirname + '/views/keyboard.html');
});

app.get('/sequencer', function (req, res) {
  res.sendFile(__dirname + '/views/sequencer.html');
});

app.get('/position', function (req, res) {
  res.sendFile(__dirname + '/views/position.html');
});

app.get('/controller', function (req, res) {
  res.sendFile(__dirname + '/views/controller.html');
});

app.get('/motion', function (req, res) {
  res.sendFile(__dirname + '/views/motion.html');
});

io.on('connection', (socket) => {
  socket.on('sequencer', (data) => {
    io.emit('sequencer', data);
  });
  socket.on('keyboard', (data) => {
    io.emit('keyboard', data);
  });
  socket.on('controller1', (data) => {
    io.emit('controller1', data);
  });
  socket.on('controller2', (data) => {
    io.emit('controller2', data);
  });
  socket.on('controller3', (data) => {
    io.emit('controller3', data);
  });
  socket.on('controller4', (data) => {
    io.emit('controller4', data);
  });
  socket.on('position', (data) => {
    io.emit('position', data);
  });
  socket.on('dial-motion', (beta) => {
    io.emit('dial-motion', beta);
  });
});

server.listen(port, () => {
  console.log(`listening on:`);
  hostnames.forEach(hostname => {
    console.log(`- https://${hostname}:${port}`);
  })
});