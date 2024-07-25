export let sequencer = {
    bars: 8,
    colors: {
        accent: "#f25138",
        fill: "#666"
    },
    ui: null,
    initialize: function(){
        this.ui = new Nexus.Sequencer('#sequencer', {
            'size': [520, 290],
            'mode': 'toggle',
            'rows': 4,
            'columns': this.bars,
            'paddingRow': 0,
            'paddingColumn': 0
        });
        this.ui.colorize("accent", this.colors.accent);
        this.ui.colorize("fill", this.colors.fill);
        this.ui.matrix.set.all(this.matrix);
    },
    matrix: [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 0]        
    ]
}