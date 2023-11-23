"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
class Socket {
    constructor(url, setStatus) {
        this.socket = null;
        this.url = url;
        this.setStatus = setStatus;
        this.connect(url);
        Socket._instance = this;
    }
    static create(url, setStatus) {
        if (Socket._instance) {
            return Socket._instance;
        }
        return new Socket(url, setStatus);
    }
    connect(url) {
        if (!url)
            return;
        console.log('connect');
        this.socket = new WebSocket(url);
        this.socketListener();
    }
    socketListener() {
        console.log('socketListener', this.socket);
        if (!this.socket) {
            console.log('.......................................socketListener');
            return;
        }
        this.socket.onopen = () => {
            console.log('onopen');
            this.setStatus('open');
        };
        this.socket.onclose = () => {
            console.log('onclose');
            this.setStatus('close');
            setTimeout(() => this.connect(this.url), 1500);
        };
        this.socket.onerror = () => {
            console.log('Socket Error');
        };
    }
    sendData(params) {
        if (!this.socket)
            return;
        this.socket.send(JSON.stringify(params));
    }
    setHandlers(callback) {
        console.log('setHandlers callback', callback);
        if (!this.socket)
            return;
        this.socket.onmessage = callback;
    }
}
exports.Socket = Socket;
