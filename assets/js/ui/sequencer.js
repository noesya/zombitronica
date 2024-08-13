import "/src/webui/WebUI.js"

var size = [130, 280];
var bpm = new window.zombitron.Slider('sliderBPM', size, window.zombitron.ui);
var sizeButton = [30,30];

var mute = [ 
    new window.zombitron.Button('muteDrum1', sizeButton, window.zombitron.ui),
    new window.zombitron.Button('muteDrum2', sizeButton, window.zombitron.ui),
    new window.zombitron.Button('muteDrum3', sizeButton, window.zombitron.ui),
    new window.zombitron.Button('muteDrum4', sizeButton, window.zombitron.ui),
    new window.zombitron.Button('muteDrum5', sizeButton, window.zombitron.ui)
];

export let sequencer = {
    bars: 16,
    ui: null,
    initialize: function(){
        this.ui = new Nexus.Sequencer('#sequencer', {
            'size': [600, 200],
            'mode': 'toggle',
            'rows': 5,
            'columns': this.bars,
            'paddingRow': 0,
            'paddingColumn': 0
        });
        this.ui.colorize("accent", window.zombitron.ui.colors.accent);
        this.ui.colorize("fill", window.zombitron.ui.colors.fill);
        this.ui.matrix.set.all(this.matrix);
    },
    matrix: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]        
    ]
}