import * as moduleSequencer from '/assets/js/ui/sequencer.js';
import * as modulePlayer from '/assets/js/musicPlayer.js';

var zombitronica = {
    sequencer: null,
    musicPlayer:null,
    initialize: function(){
        this.sequencer = moduleSequencer.sequencer;
        this.musicPlayer = modulePlayer.musicPlayer;
        this.sequencer.initialize();
        this.musicPlayer.sequencer.matrix = this.sequencer.matrix;
        this.sequencer.ui.on('change', function(data) {
            var value = data.state ? 1 : 0;
            this.musicPlayer.sequencer.matrix[data.row][data.column] = value;
        }.bind(this));
        this.initializeSocket();
    },
    initializeSocket: function () {
        this.socket = io();
        this.socket.on('position', function(data) {
            this.musicPlayer.gain.instance.gain.rampTo(data.y, 0.1);
            var freq = {
                min: 55.000,
                max: 440.000
            }
            this.musicPlayer.position.instance.setNote(data.x * (freq.max - freq.min) + freq.min);
        }.bind(this));

        this.socket.on('dial1', function(data) { // all data incomming must be clamped between 0 and 1
            // interpolate 0- min bpm 1 max p
            var bpmValue = data * (this.musicPlayer.bpm.max - this.musicPlayer.bpm.min) + this.musicPlayer.bpm.min;
            Tone.getTransport().bpm.rampTo(bpmValue, 2);
        }.bind(this));

        this.socket.on('dial2', function(data) {
            this.musicPlayer.distortion.instance.distortion = data * (this.musicPlayer.distortion.max - this.musicPlayer.distortion.min) + this.musicPlayer.distortion.min;
        }.bind(this));

        this.socket.on('dial3', function(data) {
            var reverbValue = data * (this.musicPlayer.reverb.wet.max - this.musicPlayer.reverb.wet.min) + this.musicPlayer.reverb.wet.min;
            this.musicPlayer.reverb.instance.wet.rampTo(reverbValue);
        }.bind(this));

        this.socket.on('slider1', function(data) {
            this.musicPlayer.sequencer.instruments[0].instrument.volume.value = data * (this.musicPlayer.volume.max - this.musicPlayer.volume.min) + this.musicPlayer.volume.min;
        }.bind(this));
        this.socket.on('slider2', function(data) {
            this.musicPlayer.sequencer.instruments[1].instrument.volume.value = data * (this.musicPlayer.volume.max - this.musicPlayer.volume.min) + this.musicPlayer.volume.min;
        }.bind(this));
        this.socket.on('slider3', function(data) {
            this.musicPlayer.sequencer.instruments[2].instrument.volume.value = data * (this.musicPlayer.volume.max - this.musicPlayer.volume.min) + this.musicPlayer.volume.min;
        }.bind(this));
        this.socket.on('slider4', function(data) {
            this.musicPlayer.sequencer.instruments[3].instrument.volume.value = data * (this.musicPlayer.volume.max - this.musicPlayer.volume.min) + this.musicPlayer.volume.min;
        }.bind(this));
    }
}

zombitronica.initialize();
document.addEventListener("click", async (event) => {
    await zombitronica.musicPlayer.start();
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, { once: true });