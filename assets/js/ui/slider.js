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
var multislider = new Nexus.Multislider('#content', {
    'size': [600, 300],
    'numberOfSliders': 4,
    'min': 0,
    'max': 1,
    'step': 0.1,
    'candycane': 3,
    'values': [0.1, 0.5, 0.6, 0.4],
    'smoothing': 0,
    'mode': 'bar'  // 'bar' or 'line'
})
multislider.colorize("accent", colors.accent);
multislider.colorize("fill", colors.fill);
const socket = io();

multislider.on('change', function (v) {
    socket.emit('slider', v)
})