const colors = {
    accent: "#f25138",
    fill: "#666"
}
const bars = 8;
const socket = io();

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, {once: true});

let sequencer = new Nexus.Sequencer('#sequencer', {
    'size': [520, 290],
    'mode': 'toggle',
    'rows': 5,
    'columns': bars,
    'paddingRow': 0,
    'paddingColumn': 0
});
sequencer.colorize("accent", colors.accent);
sequencer.colorize("fill", colors.fill);

sequencer.matrix.set.all([
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0]
])

sequencer.on('change', (v) => {
    socket.emit('sequencer', v)
})