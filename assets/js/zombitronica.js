let zombitronica = {
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
    sequencer: {
        matrix: [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 1],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 0, 1, 0]
        ]
    },
    position: {
        started: false
    },
    start: function () {
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
        document.body.classList.remove("started");
        this.playing = false;
        console.log("Zombitronica stop");
    },

    initialize: function () {
        console.log("Zombitronica initializing");
        this.initializeTone();
        this.initializeFilters();
        this.initializePosition();
        this.initializeSequencer();
        this.initializeSocket();
        this.initialized = true;
    },

    initializeTone: function () {
        Tone.getTransport().start();
        Tone.getTransport().bpm.value = this.bpm.default;
        Tone.context.resume();
        Tone.context.latencyHint = "interactive";
    },

    initializeFilters: function () {
        // this.lowpass.instance = new Tone.Filter(this.lowpass.default, "lowpass").toDestination();s
        this.reverb.instance = new Tone.Reverb({
            wet: this.reverb.wet.default,
            decay: this.reverb.decay.default,
            preDelay: this.reverb.preDelay.default
        }).toDestination();

        this.distortion.instance = new Tone.Distortion(this.distortion.default).chain(this.reverb.instance)
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
            this.volume = new Tone.Volume(0).chain(output);
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
            new instrument("perc2", new Tone.Player("../assets/sounds/808/808-Clave3.wav"), this.distortion.instance),
            new instrument("perc1", new Tone.Player("../assets/sounds/808/808-Cowbell.wav"), this.distortion.instance),
            new instrument("hihat", new Tone.Player("../assets/sounds/808/808-Hihats14.wav"), this.distortion.instance),
            new instrument("snare", new Tone.Player("../assets/sounds/808/808-Snare30.wav"), this.distortion.instance),
            new instrument("kick", new Tone.Player("../assets/sounds/808/808-Kicks26.wav"), this.distortion.instance)
        ];

        Tone.loaded().then(() => {
            console.log("tone loaded");
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
    },

    initializeSocket: function () {
        this.socket = io();

        this.socket.on('sequencer', (data) => {
            const value = data.state ? 1 : 0;
            this.sequencer.matrix[data.row][data.column] = value;
        });

        this.socket.on('position', (data) => {
            this.gain.instance.gain.rampTo(data.y, 0.1);
            const freq = {
                min: 55.000,
                max: 440.000
            }
            this.position.instance.setNote(data.x * (freq.max - freq.min) + freq.min);
        });

        this.socket.on('dial1', (data) => { // all data incomming must be clamped between 0 and 1
            // interpolate 0- min bpm 1 max p
            const bpmValue = data * (this.bpm.max - this.bpm.min) + this.bpm.min;
            Tone.getTransport().bpm.rampTo(bpmValue, 2);
        });

        this.socket.on('dial2', (data) => {
            this.distortion.instance.distortion = data * (this.distortion.max - this.distortion.min) + this.distortion.min;
        });

        this.socket.on('dial3', (data) => {
            const reverbValue = data * (this.reverb.wet.max - this.reverb.wet.min) + this.reverb.wet.min;
            this.reverb.instance.wet.rampTo(reverbValue);

        });

        this.socket.on('slider0', (data) => {
            this.sequencer.instruments[0].instrument.volume.value = data*(this.volume.max - this.volume.min) +  this.volume.min;
            console.log(this.sequencer.instruments[0].instrument.volume.value)
        });
        this.socket.on('slider1', (data) => {
            this.sequencer.instruments[1].instrument.volume.value = data*(this.volume.max - this.volume.min) +  this.volume.min;
            console.log(this.sequencer.instruments[1].instrument.volume.value)
        });
        this.socket.on('slider2', (data) => {
            this.sequencer.instruments[2].instrument.volume.value = data*(this.volume.max - this.volume.min) +  this.volume.min;
            console.log(this.sequencer.instruments[2].instrument.volume.value)
        });
        this.socket.on('slider3', (data) => {
            this.sequencer.instruments[3].instrument.volume.value = data*(this.volume.max - this.volume.min) +  this.volume.min;
            console.log(this.sequencer.instruments[3].instrument.volume.value)
        });
    }
}

document.addEventListener("click", (event) => {
    document.querySelector('body').requestFullscreen();
    document.addEventListener("dblclick", (ev) => {
        window.location.reload();
        document.querySelector('body').requestFullscreen();
    });
}, {once: true});

document.querySelector("#start")?.addEventListener("click", async (e) => {
    e.preventDefault()
    if (zombitronica.playing) {
        zombitronica.stop();
        e.target.innerHTML = "start"
    } else {
        await Tone.start();
        zombitronica.start();
        e.target.innerHTML = "stop"
    }
});