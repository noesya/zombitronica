import "/scripts/tone/build/Tone.js";
import * as instruments from "/assets/js/instruments/soundBank1.js";

export let musicPlayer = {
    initialized: false,
    playing: false,
    bpm: {
        min: 80,
        max: 200,
        default: 100
    },
    gain: {
        min: 0,
        max: 1,
        default: 0
    },
    distortion: {
        min: 0,
        max: 1,
        default: 0
    },
    reverb: {
        wet: {
            min: 0,
            max: 1,
            default: 0
        },
        decay: {
            min: 0.01,
            max: 3,
            default: 2
        },
        preDelay: { // ms
            min: 0,
            max: 1,
            default: 0.01
        }
    },
    lowpass: {
        min: 0,
        max: 20000,
        default: 20000
    },
    volume: {
        min: -60,
        max: 10,
        default: 0
    },
    sequencer: {},
    position: {
        started: false
    },
    start: function () {
        console.log(Tone)
        Tone.start();
        if (!this.initialized) {
            this.initialize();
        }
        Tone.getTransport().start();
        document.body.classList.add("started");
        this.playing = true;
        console.log("Zombitronica start");
    },

    stop: function () {
        Tone.getTransport().stop();
        this.playing = false;
    },

    initialize: function () {
        this.initializeTone();
        this.initializeFilters();
        this.initializePosition();
        this.initializeSequencer();
        this.initialized = true;
    },

    initializeTone: function () {
        Tone.getTransport().start();
        Tone.getTransport().bpm.value = this.bpm.default;
        Tone.context.resume();
    },

    initializeFilters: function () {
        // this.lowpass.instance = new Tone.Filter(this.lowpass.default, "lowpass").toDestination();
        this.reverb.instance = new Tone.Reverb({
            wet: this.reverb.wet.default,
            decay: this.reverb.decay.default,
            preDelay: this.reverb.preDelay.default
        }).toDestination();

        this.distortion.instance = new Tone.Distortion(this.distortion.default).chain(this.reverb.instance);
        this.gain.instance = new Tone.Gain(this.gain.default).toDestination();
    },

    initializePosition: function () {
        this.position.instance = new Tone.DuoSynth(instruments.duoSynth1).chain(this.gain.instance);
        const minFreq = 55.000;
        this.position.instance.triggerAttack(minFreq);
        this.position.started = true;
    },

    initializeSequencer: function () {
        // Step va de 0 à 7 et indique l'étape de la matrice en cours (la verticale)
        this.sequencer.step = 0;

        const instrument = function (type, instrument_instance, output, note = "D3") {
            this.volume = new Tone.Gain(1).chain(output);
            this.type = type;
            this.note = note;
            this.instrument = instrument_instance.chain(this.volume);
            this.start = function (time) {
                if (this.type == "player") {
                    this.instrument.start(time)
                } else if (this.type == "synth") {
                    this.instrument.triggerAttack(this.note, time, 0.5)
                }
                return this
            };
        };

        this.sequencer.instruments = [
            new instrument("player", new Tone.Player("../assets/sounds/75841__rossf__lm1-hat-open.wav"), this.distortion.instance),
            new instrument("player", new Tone.Player("../assets/sounds/422304__akustika__hcr-01.wav"), this.distortion.instance),
            new instrument("player", new Tone.Player("../assets/sounds/422461__akustika__sdr-105.wav"), this.distortion.instance),
            new instrument("player", new Tone.Player("../assets/sounds/422286__akustika__bdr-05.wav"), this.distortion.instance)
        ];

        Tone.loaded().then(() => {
            // Le loop est le moteur du séquenceur
            this.sequencer.loop = new Tone.Loop((time) => {
                this.sequencer.playSounds(time);
                this.sequencer.step = (this.sequencer.step + 1) % 8;
            }, "8n").start(0);

            // La fonction qui joue les sons selon l'état de la matrice
            this.sequencer.playSounds = function (time) {
                for (let i = 0; i < this.instruments.length; i++) {
                    const active = this.matrix[i][this.step] == 1;
                    if (active) {
                        this.instruments[i].start(time);
                    }
                }
            };
        });
    }
}