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
        wet: { // 
            min: 0,
            max: 1,
            default: 0
        },
        decay: {
            min: 0,
            max: 1,
            default: 1.5
        },
        preDelay: { // ms
            min: 0,
            max: 1,
            default: 0.001
        }
    },
    lowpass: {
        min: 0,
        max: 20000,
        default: 2000
    },
    sequencer: {
        matrix: [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 1],
            [0, 1, 0, 1, 1, 0, 1, 0]
        ]
    },

    start: function () {
        if (!this.initialized) {
            this.initialize();
        }
        Tone.Transport.start();
        document.body.classList.add("started");
        this.playing = true;
        console.log("Zombitronica start");
    },

    stop: function () {
        Tone.Transport.stop();
        document.body.classList.remove("started");
        this.playing = false;
        console.log("Zombitronica stop");
    },

    initialize: function () {
        console.log("Zombitronica initializing");
        this.initializeTone();
        console.log("Tone initialized");
        this.initializeFilters();
        console.log("Filters initialized");
        this.initializePosition();
        console.log("Position initialized");
        this.initializeSequencer();
        console.log("Sequencer initialized");
        this.initializeSocket();
        console.log("Socket initialized");
        this.initialized = true;
    },

    initializeTone: function () {
        Tone.Transport.start();
        Tone.Transport.bpm.value = this.bpm.default;
        Tone.context.resume();
        Tone.context.latencyHint = "interactive";
    },

    initializeFilters: function () {
        this.gain.instance = new Tone.Gain(0).toDestination()
        this.lowpass.instance = new Tone.Filter(this.lowpass.default, "lowpass").toDestination();
        this.reverb.instance = new Tone.Reverb({
            "wet": this.reverb.wet.default,
            "decay": this.reverb.decay.default,
            "preDelay": this.reverb.preDelay.default}).chain(this.lowpass.instance);
        this.distortion.instance = new Tone.Distortion(this.distortion.default).toDestination();
    },

    initializePosition: function () {
        this.position = new Tone.DuoSynth(instruments.duoSynth1).chain(this.gain.instance);
    },

    initializeSequencer: function () {
        // Step va de 0 à 7 et indique l'étape de la matrice en cours (la verticale)
        this.sequencer.step = 0;
        this.sequencer.instruments = [
            {
                'synth': new Tone.Player("../assets/sounds/kick1.wav").toDestination(), // kick
                'start' : function (time) { this.synth.start(time) }
            },
            {
                'synth': new Tone.Player("../assets/sounds/bell3.wav").toDestination(), 
                'start' : function (time) { this.synth.start(time) }
            },
            {
                'synth': new Tone.FMSynth(instruments.FMSynth2).toDestination(),
                'note': 'F2',
                'start' : function (time) { this.synth.triggerAttack(this.note, time, 0.5) }
            },
            {
                'synth': new Tone.Player("../assets/sounds/hihat.wav").toDestination(), 
                'start' : function (time) { this.synth.start(time) }
            }
        ];

        Tone.loaded().then(() => {
            console.log("tone loaded")
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
            const range = ['A1', 'C2' , 'D2' , 'E2' , 'G2', 'A2', 'C3' , 'D3' , 'E3' , 'G3', 'A4']
            let newpitch = range[parseInt(data.x*10)]
            if ( this.positionpitch != newpitch) {
                this.position.triggerAttack(newpitch);
                this.positionpitch = newpitch;
            }
        });

        this.socket.on('dial1', (data) => { // all data incomming must be clamped between 0 and 1
            // interpolate 0- min bpm 1 max p
            const bpmValue = data * (this.bpm.max - this.bpm.min) + this.bpm.min;
            console.log(bpmValue)
            Tone.Transport.bpm.rampTo(bpmValue, 2);
        });
        
        this.socket.on('dial2', (data) => {
            this.distortion.instance.distortion = data;
        });

        this.socket.on('dial3', (data) => {
            this.highpass.instance.frequency.rampTo(data, 0.5);
        });

        this.socket.on('slider', (data) => {
            console.log(data)
        });
    }
}

document.querySelector("#start")?.addEventListener("click", async () => {
    await Tone.start();
    zombitronica.start();
})

document.querySelector("#stop")?.addEventListener("click", ()  => {
    zombitronica.stop();
})
