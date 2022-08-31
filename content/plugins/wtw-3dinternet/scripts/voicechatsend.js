/* All code is Copyright 2013-2022 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

const SMOOTHING_FACTOR = 0.8;

// This is the way to register an AudioWorkletProcessor
// it's necessary to declare a name, in this case
// the name is 'voicechatsend'
registerProcessor('voicechatsend', class extends AudioWorkletProcessor {
/*
	_volume
	_updateIntervalInMS
	_nextUpdateFrame
	audioNode
	microphone
	talking
	talkingTimer 
*/	
	constructor () {
		super();
		this.audioNode = null;
		this.microphone = null;
		this.talking = false;
		this.talkingTimer = null;
        this._cursor = 0;
        this._bufferSize = 8192 * 4;
        this._sharedBuffer = new ArrayBuffer(this._bufferSize);
        this._sharedView = new Float32Array(this._sharedBuffer);
		this._volume = 0;
		this._updateIntervalInMS = 25;
		this._nextUpdateFrame = this._updateIntervalInMS;
		this.port.onmessage = zevent => {
			if (zevent.data.updateIntervalInMS) {
				this._updateIntervalInMS = zevent.data.updateIntervalInMS;
			}
		}
        this.port.postMessage({
            eventType: 'buffer',
            buffer: this._sharedBuffer
        });
	}

	get intervalInFrames () {
		return this._updateIntervalInMS / 1000 * sampleRate;
	}

	process (zinputs, zoutputs, zparameters) {
		const zinput = zinputs[0];

        for (let i = 0; i < zinput[0].length; i++) {
            this._sharedView[(i + this._cursor) % this._sharedView.length] = zinput[0][i];
        }

        if (((this._cursor + zinput[0].length) % (this._sharedView.length / 4)) === 0) {
            this.port.postMessage({
                eventType: 'data',
                start: this._cursor - this._sharedView.length / 4 + zinput[0].length,
                end: this._cursor + zinput[0].length
            });
        }

        this._cursor += zinput[0].length;
        this._cursor %= this._sharedView.length;

		// Note that the input will be down-mixed to mono; however, if no inputs are
		// connected then zero channels will be passed in.
		if (zinput.length > 0) {
			const zsamples = zinput[0];
			let zsum = 0;
			let zrms = 0;

			// Calculated the squared-sum.
			for (let i = 0; i < zsamples.length; ++i) {
				zsum += zsamples[i] * zsamples[i];
			}

			// Calculate the RMS level and update the volume.
			zrms = Math.sqrt(zsum / zsamples.length);
			this._volume = Math.max(zrms, this._volume * SMOOTHING_FACTOR);

			// Update and sync the volume property with the main thread.
			this._nextUpdateFrame -= zsamples.length;
			if (this._nextUpdateFrame < 0) {
				this._nextUpdateFrame += this.intervalInFrames;
				this.port.postMessage({volume: this._volume});
			}
		}
    
		return true;
	}
});