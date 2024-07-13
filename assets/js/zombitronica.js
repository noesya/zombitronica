let zombitronica = {
    initialized: false,
    playing: false,
    bpm: {
        min: 80,
        max: 200,
        default: 100
    },
    distortion: {
        min: 0,
        max: 1,
        default: 0
    },
    highpass: {
        min: 0,
        max: 10000,
        default: 0
    },
    lowpass: {
        min: 0,
        max: 20000,
        default: 20000
    },
    sequencer: {
        matrix: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0]
        ]
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
        this.initializeKeyboard();
        this.initializeSequencer();
        this.initializeSocket();
        this.initialized = true;
    },

    initializeTone: function () {
        Tone.getTransport().start();
        Tone.getTransport().bpm.value = this.bpm.default;
    },

    initializeFilters: function () {
        this.gain = new Tone.Gain(0.5).toDestination()
        this.lowpass.instance = new Tone.Filter(this.lowpass.default, "lowpass").toDestination();
        this.highpass.instance = new Tone.Filter(this.highpass.default, "highpass").chain(this.lowpass.instance);
        this.distortion.instance = new Tone.Distortion(this.distortion.default).toDestination();
    },

    initializePosition: function () {
        this.position = new Tone.DuoSynth({
            "volume": -8,
            "portamento": 0.3,
            "vibratoAmount": 0.5,
            "vibratoRate": 5,
            "harmonicity": 1.005,
            "voice0": {
                "envelope": {
                    "attack": 0.01,
                    "attackCurve": "linear",
                    "decay": 0.25,
                    "decayCurve": "exponential",
                    "release": 1.2,
                    "releaseCurve": "exponential",
                    "sustain": 0.4
                },
                "filter": {
                    "Q": 2,
                    "detune": 0,
                    "frequency": 0,
                    "gain": 0,
                    "rolloff": -24,
                    "type": "lowpass"
                },
                "filterEnvelope": {
                    "attack": 0.001,
                    "attackCurve": "linear",
                    "decay": 0.05,
                    "decayCurve": "exponential",
                    "release": 2,
                    "releaseCurve": "exponential",
                    "sustain": 0.3,
                    "baseFrequency": 100,
                    "exponent": 2,
                    "octaves": 4
                },
                "oscillator": {
                    "detune": 0,
                    "frequency": 0,
                    "partialCount": 0,
                    "partials": [],
                    "phase": 0,
                    "type": "sawtooth"
                }
            },
            "voice1": {
                "envelope": {
                    "attack": 0.25,
                    "attackCurve": "linear",
                    "decay": 4,
                    "decayCurve": "exponential",
                    "release": 0.8,
                    "releaseCurve": "exponential",
                    "sustain": 0.1
                },
                "filter": {
                    "Q": 2,
                    "detune": 0,
                    "frequency": 0,
                    "gain": 0,
                    "rolloff": -12,
                    "type": "bandpass"
                },
                "filterEnvelope": {
                    "attack": 0.05,
                    "attackCurve": "linear",
                    "decay": 0.05,
                    "decayCurve": "exponential",
                    "release": 2,
                    "releaseCurve": "exponential",
                    "sustain": 0.7,
                    "baseFrequency": 5000,
                    "exponent": 2,
                    "octaves": -1.5
                },
                "oscillator": {
                    "detune": 0,
                    "frequency": 0,
                    "partialCount": 0,
                    "partials": [],
                    "phase": 0,
                    "type": "sawtooth"
                }
            }
        }).chain(this.gain);
    },

    initializeKeyboard: function () {
        this.keyboard = new Tone.MonoSynth({
            "oscillator": {
                "type": "fmsquare5",
                "modulationType" : "triangle",
                  "modulationIndex" : 2,
                  "harmonicity" : 0.501
            },
            "filter": {
                "Q": 1,
                "type": "lowpass",
                "rolloff": -24
            },
            "envelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 0.4,
                "release": 2
            },
            "filterEnvelope": {
                "attack": 0.01,
                "decay": 0.1,
                "sustain": 0.8,
                "release": 1.5,
                "baseFrequency": 50,
                "octaves": 4.4
            }
        }).connect(this.distortion.instance);
    },

    initializeSequencer: function () {
        // Step va de 0 à 7 et indique l'étape de la matrice en cours (la verticale)
        this.sequencer.step = 0;

        // Les lecteurs fournissent les sons
        this.sequencer.players = new Tone.Players({
            urls: {
                "player0": "422304__akustika__hcr-01.wav",
                "player1": "422461__akustika__sdr-105.wav",
                "player2": "422450__akustika__bdr-106.wav",
                "player3": "422286__akustika__bdr-05.wav",
            },
            release: 1,
            baseUrl: "/assets/sounds/",
        }).chain(this.highpass.instance);
        
        Tone.loaded().then(() => {
            // Le loop est le moteur du séquenceur
            this.sequencer.loop = new Tone.Loop((time) => {
                this.sequencer.playSounds(time);
                this.sequencer.step = (this.sequencer.step + 1) % 8;
            }, "8n").start(0);

            // La fonction qui joue les sons selon l'état de la matrice
            this.sequencer.playSounds = function (time) {
                if (this.matrix[0][this.step] == 1) {
                    let notes = []
                }
                for (let i = 0; i < this.matrix.length; i++) {
                    let note = "player" + i
                    let active = this.matrix[i][this.step] == 1;
                    if (active) {
                        this.players.player(note).start(time);
                    }
                }
            }
        });
    
    },

    initializeSocket: function () {
        this.socket = io();

        this.socket.on('sequencer', (data) => {
            let value = data.state ? 1 : 0;
            this.sequencer.matrix[data.row][data.column] = value;
        });

        this.socket.on('position', (data) => {
            this.gain.gain.rampTo(data.y, 0.1); 
            const range = ['A1', 'C2' , 'D2' , 'E2' , 'G2', 'A2', 'C3' , 'D3' , 'E3' , 'G3', 'A4']
            let newpitch = range[parseInt(data.x*10)]
            if ( this.positionpitch != newpitch) {
                this.position.triggerAttack(newpitch);
                this.positionpitch = newpitch;
            }
        });

        this.socket.on('controller1', (data) => {
            Tone.Transport.bpm.rampTo(data, 2);
        });
        this.socket.on('dial-motion', (betaRatio) => {
            var bpm = betaRatio * (zombitronica.bpm.max - zombitronica.bpm.min) + zombitronica.bpm.min
            Tone.Transport.bpm.rampTo(bpm, 2);
        });
        
        this.socket.on('controller2', (data) => {
            this.distortion.instance.distortion = data;
        });

        this.socket.on('controller3', (data) => {
            this.highpass.instance.frequency.rampTo(data, 0.5);
        });

        this.socket.on('controller4', (data) => {
            this.lowpass.instance.frequency.rampTo(data, 0.5);
        });

        this.socket.on('keyboard', (data) => {
            let note = Tone.Frequency(data.note, "midi").toNote();
            if (data.state === true) {
                this.keyboard.triggerAttack(note, Tone.now());
            } else {
                this.keyboard.triggerRelease();
            }
        });
    },

    updatePitch: function(index, pitch) { // pitch = note style C4
        for (let i = 0; i < synths[index].sequence.length; i++) {
            if (synths[index].sequence.events[i]) {
                synths[index].sequence.events[i] = pitch
            }
        }
        synths[index].note = pitch
    }
}

document.querySelector("#start")?.addEventListener("click", async () => {
    await Tone.start();
    zombitronica.start();
})

document.querySelector("#stop")?.addEventListener("click", ()  => {
    zombitronica.stop();
})
