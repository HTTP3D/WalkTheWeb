class PlaybackProcessor extends AudioWorkletProcessor {

    constructor() {
        super();
        this._cursor = 0;
        this._bufferSize = 8192 * 4;
        this._sharedBuffer = new ArrayBuffer(this._bufferSize);
        this._sharedView = new Float32Array(this._sharedBuffer);
        this.port.postMessage({
            eventType: 'buffer',
            buffer: this._sharedBuffer
        });
    }

    process(inputs, outputs) {

        for (let i = 0; i < outputs[0][0].length; i++) {
            outputs[0][0][i] = this._sharedView[i + this._cursor];
            this._sharedView[i + this._cursor] = 0;
        }

        this._cursor += outputs[0][0].length;
        this._cursor %= this._sharedView.length;

        return true;
    }
}

registerProcessor('playback-processor', PlaybackProcessor);