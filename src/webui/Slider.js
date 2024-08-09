var Slider = function(id, size, options) {
    this.ui = null;
    this.id = id;
    this.socket = io();
    this.size = size;
    this.initialize(options);
}

Slider.prototype.initialize = function (options){
    var container = "#" + this.id;
    this.ui = new Nexus.Slider(container, {
        'size': this.size,
        'mode': 'absolute',  // 'relative' or 'absolute'
        'min': 0,
        'max': 1,
        'step': 0,
        'value': 0
    })

    this.ui.colorize("accent", options.colors.accent);
    this.ui.colorize("fill", options.colors.fill);
    this.ui.on('change', function (v) {
        this.socket.emit("message", {id: this.id, value: v});
    }.bind(this));
}
export default Slider