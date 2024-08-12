import "/src/webui/WebUI.js"

var size = [130, 280];

var bpm = new window.zombitron.Slider('sliderBPM', size, window.zombitron.ui);

export let sequencer = {
    bars: 16,
    ui: null,
    initialize: function(){
        this.ui = new Nexus.Sequencer('#sequencer', {
            'size': [520, 290],
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
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]        
    ]
}