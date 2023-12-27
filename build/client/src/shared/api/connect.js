"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAPI = void 0;
const socket_1 = require("processes/socket");
const connectAPI = (url, hash) => {
    console.log('connectAPI');
    const data = {
        event: 'connect',
        payload: {
            url
        }
    };
    if (hash)
        data.payload.hash = hash;
    socket_1.WS.sendData(data);
};
exports.connectAPI = connectAPI;
