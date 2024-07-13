let controller1 = new Nexus.Slider('#content1', {
    'size': [40, 200],
    'mode': 'relative',
    'step': 0,
    'min': zombitronica.bpm.min,
    'max': zombitronica.bpm.max,
    'value': zombitronica.bpm.default
});
controller1.colorize("accent","#f25138");
controller1.colorize("fill","#666");

let controller2 = new Nexus.Dial('#content2', {
    'size': [200, 200],
    'interaction': 'radial',
    'mode': 'relative',
    'step': 0,
    'min': zombitronica.distortion.min,
    'max': zombitronica.distortion.max,
    'value': zombitronica.distortion.default,
});
controller2.colorize("accent","#f25138");
controller2.colorize("fill","#666");

let controller3 = new Nexus.Dial('#content3', {
    'size': [200, 200],
    'interaction': 'radial',
    'mode': 'relative',
    'step': 0,
    'min': zombitronica.highpass.min,
    'max': zombitronica.highpass.max,
    'value': zombitronica.highpass.default
});
controller3.colorize("accent","#f25138");
controller3.colorize("fill","#666");

let controller4 = new Nexus.Dial('#content4', {
    'size': [200, 200],
    'interaction': 'radial',
    'mode': 'relative',
    'step': 0,
    'min': zombitronica.lowpass.min,
    'max': zombitronica.lowpass.max,
    'value': zombitronica.lowpass.default
});
controller4.colorize("accent","#f25138");
controller4.colorize("fill","#666");

const socket = io();

controller1.on('change', function (data) {
    socket.emit('controller1', data);
})

controller2.on('change', function (data) {
    socket.emit('controller2', data);
})

controller3.on('change', function (data) {
    socket.emit('controller3', data);
})

controller4.on('change', function (data) {
    socket.emit('controller4', data);
})
