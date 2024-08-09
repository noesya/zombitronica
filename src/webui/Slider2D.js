var Slider2D = function(id, size, options) {
    this.ui = null;
    this.id = id;
    this.socket = io();
    this.lastValue = 0;
    this.size = size;
    this.initialize(options);
}

Slider2D.prototype.initialize = function (options){
    var container = "#" + this.id;
    this.ui = new Nexus.Position(container, {
        'size': this.size,
        'mode': 'absolute',  // "absolute" or "relative"
        'x': 0.5,  // initial x value
        'minX': 0,
        'maxX': 1,
        'stepX': 0,
        'y': 0,  // initial y value
        'minY': 0,
        'maxY': 1,
        'stepY': 0
    });

    this.ui.colorize("accent", options.colors.accent);
    this.ui.colorize("fill", options.colors.fill);
    this.ui.on('change', function (v) {
        v = {
            x: Math.floor(v.x*100)/100,
            y: Math.floor(v.y*100)/100
        }
        if(v != this.lastValue ){
            this.socket.emit("message", {id: this.id, value: v});
            this.lastValue = v;
        }
    }.bind(this))
}
export default Slider2D