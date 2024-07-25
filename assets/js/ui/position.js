const colors = {
    accent: "#f25138",
    fill: "#555"
}

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, {once: true});


let position = new Nexus.Position('#content', {
    'size': [220, 220],
    'mode': 'absolute',  // "absolute" or "relative"
    'x': 0.5,  // initial x value
    'minX': 0,
    'maxX': 1,
    'stepX': 0,
    'y': 0,  // initial y value
    'minY': 0,
    'maxY': 1,
    'stepY': 0
}
);
position.colorize("accent", colors.accent);
position.colorize("fill", colors.fill);
const socket = io();

position.on('change', function (v) {
    socket.emit('position', v)
})

window.addEventListener("devicemotion", (event) => {
    console.log(event);
});
