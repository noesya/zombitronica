try {
    document.requestFullscreen();
} catch (e) {}

let piano = new Nexus.Piano('#content', {
    'size': [600, 300],
    'mode': 'button',
    'lowNote': 36,
    'highNote': 48
})
piano.colorize("accent","#f25138");
piano.colorize("fill","#666");

const socket = io();

piano.on('change', function (data) {
    socket.emit('keyboard', data);
})