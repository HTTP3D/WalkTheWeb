class RecordProcessor extends AudioWorkletProcessor {

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

        for (let i = 0; i < inputs[0][0].length; i++) {
            this._sharedView[(i + this._cursor) % this._sharedView.length] = inputs[0][0][i];
        }

        if (((this._cursor + inputs[0][0].length) % (this._sharedView.length / 4)) === 0) {
            this.port.postMessage({
                eventType: 'data',
                start: this._cursor - this._sharedView.length / 4 + inputs[0][0].length,
                end: this._cursor + inputs[0][0].length
            });
        }

        this._cursor += inputs[0][0].length;
        this._cursor %= this._sharedView.length;

        return true;
    }
}

registerProcessor('record-processor', RecordProcessor);