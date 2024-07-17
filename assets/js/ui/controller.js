const colors = {
    accent: "#f25138",
    fill: "#000"
}

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, {once: true});

let dial1 = new Nexus.Dial('#content', {
    'size': [200, 200],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0
});
dial1.colorize("accent", colors.accent);
dial1.colorize("fill", colors.fill);
let dial2 = new Nexus.Dial('#content2', {
    'size': [200, 200],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0
});
dial2.colorize("accent", colors.accent);
dial2.colorize("fill", colors.fill);
let dial3 = new Nexus.Dial('#content3', {
    'size': [200, 200],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0
});
dial3.colorize("accent", colors.accent);
dial3.colorize("fill", colors.fill);

const socket = io();
dial1.on('change', function (v) {
    socket.emit('dial1', v)
})

dial2.on('change', function (v) {
    socket.emit('dial2', v)
})

dial3.on('change', function (v) {
    socket.emit('dial3', v)
})

window.addEventListener("devicemotion", (event) => {
    console.log(event);
});