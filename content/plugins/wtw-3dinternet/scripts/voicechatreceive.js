/* All code is Copyright 2013-2023 Aaron Scott Dishno Ed.D., HTTP3D Inc. - WalkTheWeb, and the contributors */
/* "3D Browsing" is a USPTO Patented (Serial # 9,940,404) and Worldwide PCT Patented Technology by Aaron Scott Dishno Ed.D. and HTTP3D Inc. */
/* Read the included GNU Ver 3.0 license file for details and additional release information. */

registerProcessor('voicechatreceive', class extends AudioWorkletProcessor {

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

    process(zinputs, zoutputs) {
		const zoutput = zoutputs[0];
		
        for (let i = 0; i < zoutput[0].length; i++) {
            zoutput[0][i] = this._sharedView[i + this._cursor];
            this._sharedView[i + this._cursor] = 0;
        }

        this._cursor += zoutput[0].length;
        this._cursor %= this._sharedView.length;

        return true;
    }
});