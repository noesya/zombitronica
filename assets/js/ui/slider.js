const colors = {
    accent: "#f25138",
    fill: "#999"
}
document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, { once: true });

var parameters = {
    'size': [130, 280],
    'mode': 'absolute',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0
};

var multislider = [
    new Nexus.Slider('#content1', parameters),
    new Nexus.Slider('#content2', parameters),
    new Nexus.Slider('#content3', parameters),
    new Nexus.Slider('#content4', parameters)
];

const socket = io();
for (let i = 0; i < multislider.length; i += 1) {
    multislider[i].colorize("accent", colors.accent);
    multislider[i].colorize("fill", colors.fill);
    multislider[i].on('change', function (v) {
        socket.emit('slider' + i, v)
    });
}