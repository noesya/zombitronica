let instruments = {
    "FMSynth1" :{
        "volume": -15,
        "detune": 1,
        "portamento": 1,
        "harmonicity": 4,
        "oscillator": {
            "partialCount": 0,
            "partials": [],
            "phase": 0,
            "type": "sine"
        },
        "envelope": {
            "attack": 0.01,
            "attackCurve": "linear",
            "decay": 0.2,
            "decayCurve": "exponential",
            "release": 0.5,
            "releaseCurve": "exponential",
            "sustain": 1
        },
        "modulation": {
            "partialCount": 0,
            "partials": [],
            "phase": 0,
            "type": "sine"
        },
        "modulationEnvelope": {
            "attack": 0.1,
            "attackCurve": "linear",
            "decay": 0.0001,
            "decayCurve": "exponential",
            "release": 1.5,
            "releaseCurve": "exponential",
            "sustain": 1
        },
        "modulationIndex": 152.22
    },
    "membraneSynth1" : { "volume": -10 },
    "metalSynth1" : { // metal snare
        "volume": -15,
        "detune": 0,
        "portamento": 0,
        "envelope": {
            "attack": 0.001,
            "attackCurve": "linear",
            "decay": 0.4,
            "decayCurve": "exponential",
            "release": 0.2,
            "releaseCurve": "exponential",
            "sustain": 0
        },
        "harmonicity": 12,
        "modulationIndex": 20,
        "octaves": 1.5,
        "resonance": 800
    },
    "FMSynth2": { // vroom bass
        'volume': 0,
        'harmonicity': 1,
        'modulationIndex': 3.5,
        'oscillator': {
            'type': "custom",
            'partials': [0, 1, 0, 2]
        },
        'envelope': {
            'attack': 0.08,
            'decay': 0.3,
            'sustain': 0,
        },
        'modulation': {
            'type': "square"
        },
        'modulationEnvelope': {
            'attack': 0.1,
            'decay': 0.2,
            'sustain': 0.3,
            'release': 0.01
        },
    },
    "metalSynth2" : {
        "volume": 0,
        "detune": 0,
        "portamento": 0.5,
        "envelope": {
            "attack": 0.01,
            "attackCurve": "linear",
            "decay": 0.1,
            "decayCurve": "exponential",
            "release": 1,
            "releaseCurve": "exponential",
            "sustain": 0.1
        },
        "oscillator": {
            "partialCount": 2,
            "partials": [
                0.030140817901234556,
                1
            ],
            "phase": 0,
            "type": "custom"
        }
    },
    "duoSynth1" : {
        "volume": -8,
        "detune": 3,
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
    }
}