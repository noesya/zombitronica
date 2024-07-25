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
let lastValue = 0;
position.on('change', function (v) {
    v = {
        x: Math.floor(v.x*100)/100,
        y: Math.floor(v.y*100)/100
    }
    if(v != lastValue ){
        socket.emit('position', v)
        lastValue = v;
    }
})

window.addEventListener("devicemotion", (event) => {
    console.log(event);
});
