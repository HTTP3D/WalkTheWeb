var socket;
var ctx; //(WTW.audioSend)
var playbackBuffers = {};
var audioWorkletNodes = {};
var isMuted = true;

$(document).ready(function () {

    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        $('#login-view').hide();
        $('#content-view').show();
        connectToVoiceServer($('#username').val());
        createAudioContext();

        $('#mute-toggle').click(function () {
            isMuted = !isMuted;
            if (isMuted) {
                $('#mute-toggle').html('<i class="bi bi-mic-mute"></i>');
            } else {
                $('#mute-toggle').html('<i class="bi bi-mic"></i>');
            }
        });

        if (navigator.mediaDevices) {
            setupRecordWorklet();
        } else {
            // TODO: Display warning can not access microphone
        }
    });
});

function setupRecordWorklet() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(async function (stream) {
            await WTW.audioSend.audioWorklet.addModule('./js/record-processor.js');
            let src = WTW.audioSend.createMediaStreamSource(stream);

            WTW.audioSend.audioNode = new AudioWorkletNode(WTW.audioSend, 'record-processor');

            let recordBuffer;
            WTW.audioSend.audioNode.port.onmessage = (e) => {
                if (e.data.eventType === 'buffer') {
                    recordBuffer = new Float32Array(e.data.buffer);
                }
                if (e.data.eventType === 'data' && !isMuted) {
                    socket.volatile.emit('voice', { id: socket.id, buffer: recordBuffer.slice(e.data.start, e.data.end).buffer });
                }
            }
            src.connect(WTW.audioSend.audioNode);
        })
        .catch(function (err) {
            console.log('The following error occurred: ' + err);
        });

    socket.on('voice', data => {
        if (playbackBuffers[data.id]) {
            let buffer = new Float32Array(data.buffer);
            playbackBuffers[data.id].buffer.set(buffer, playbackBuffers[data.id].cursor);
            playbackBuffers[data.id].cursor += buffer.length;
            playbackBuffers[data.id].cursor %= buffer.length * 4;
        }
    });
}

function createAudioContext() {
    WTW.audioSend = new AudioContext();
    WTW.audioReceive = new AudioContext();
}

function connectToVoiceServer(username) {
    socket = io("wss://example.com", { query: `username=${username}` });

    socket.on("connect", function () {

    });

    socket.on('user:connect', function (user) {
        addUser(user.id, user.username);
    });

    socket.on('user:disconnect', function (id) {
        removeUser(id);
    });

    socket.on('user:list', function (users) {
        users.forEach(function (user) {
            addUser(user.id, user.username);
        });
    });
}

function addUser(id, username) {
    $('#user-list').append(`<li id="${id}" class="list-group-item text-truncate">${username}</li>`);
    addUserAudio(id);
}

function removeUser(id) {
    $('#' + id).remove();
    removeUserAudio(id);
}

async function addUserAudio(id) {
    await WTW.audioReceive.audioWorklet.addModule('./js/playback-processor.js');
    audioWorkletNodes[id] = new AudioWorkletNode(WTW.audioReceive, 'playback-processor');

    audioWorkletNodes[id].port.onmessage = (e) => {
        if (e.data.eventType === 'buffer') {
            playbackBuffers[id] = { cursor: 0, buffer: new Float32Array(e.data.buffer) };
        }
    }

    audioWorkletNodes[id].connect(WTW.audioReceive.destination);
}

function removeUserAudio(id) {
    audioWorkletNodes[id].disconnect();
    audioWorkletNodes[id] = undefined;
    playbackBuffers[id] = undefined;
}