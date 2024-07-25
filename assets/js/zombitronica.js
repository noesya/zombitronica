import * as moduleSequencer from '/assets/js/ui/sequencer.js';
import * as modulePlayer from '/assets/js/musicPlayer.js';

let zombitronica = {
    sequencer: null,
    musicPlayer:null,
    initialize: function(){
        this.sequencer = moduleSequencer.sequencer;
        this.musicPlayer = modulePlayer.musicPlayer;
        this.sequencer.initialize();
        this.musicPlayer.sequencer.matrix = this.sequencer.matrix;
        this.sequencer.ui.on('change', (data) => {
            const value = data.state ? 1 : 0;
            this.musicPlayer.sequencer.matrix[data.row][data.column] = value;
        });
        this.initializeSocket();
    },
    initializeSocket: function () {
        this.socket = io();

        this.socket.on('position', (data) => {
            this.musicPlayer.gain.instance.gain.rampTo(data.y, 0.1);
            const freq = {
                min: 55.000,
                max: 440.000
            }
            this.musicPlayer.position.instance.setNote(data.x * (freq.max - freq.min) + freq.min);
        });

        this.socket.on('dial1', (data) => { // all data incomming must be clamped between 0 and 1
            // interpolate 0- min bpm 1 max p
            const bpmValue = data * (this.musicPlayer.bpm.max - this.musicPlayer.bpm.min) + this.musicPlayer.bpm.min;
            Tone.getTransport().bpm.rampTo(bpmValue, 2);
        });

        this.socket.on('dial2', (data) => {
            this.musicPlayer.distortion.instance.distortion = data * (this.musicPlayer.distortion.max - this.musicPlayer.distortion.min) + this.musicPlayer.distortion.min;
        });

        this.socket.on('dial3', (data) => {
            const reverbValue = data * (this.musicPlayer.reverb.wet.max - this.musicPlayer.reverb.wet.min) + this.musicPlayer.reverb.wet.min;
            this.musicPlayer.reverb.instance.wet.rampTo(reverbValue);

        });

        this.socket.on('slider0', (data) => {
            this.musicPlayer.sequencer.instruments[0].instrument.volume.value = data * (this.musicPlayer.volume.max - this.musicPlayer.volume.min) + this.musicPlayer.volume.min;
        });
        this.socket.on('slider1', (data) => {
            this.musicPlayer.sequencer.instruments[1].instrument.volume.value = data * (this.musicPlayer.volume.max - this.musicPlayer.volume.min) + this.musicPlayer.volume.min;
        });
        this.socket.on('slider2', (data) => {
            this.musicPlayer.sequencer.instruments[2].instrument.volume.value = data * (this.musicPlayer.volume.max - this.musicPlayer.volume.min) + this.musicPlayer.volume.min;
        });
        this.socket.on('slider3', (data) => {
            this.musicPlayer.sequencer.instruments[3].instrument.volume.value = data * (this.musicPlayer.volume.max - this.musicPlayer.volume.min) + this.musicPlayer.volume.min;
        });
    }
}


zombitronica.initialize();


document.addEventListener("click", async (event) => {
    await Tone.start();

    zombitronica.musicPlayer.start();
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, { once: true });