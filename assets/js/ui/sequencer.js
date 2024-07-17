const colors = {
    accent: "#f25138",
    fill: "#666"
}
const bars = 8;
const socket = io();
try {
    document.requestFullscreen();
} catch (e) { }
let sequencer = new Nexus.Sequencer('#sequencer', {
    'size': [600, 300],
    'mode': 'toggle',
    'rows': 4,
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
    [0, 1, 0, 1, 1, 0, 1, 0]
])

sequencer.on('change', (v) => {
    socket.emit('sequencer', v)
})