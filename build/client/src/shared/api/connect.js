"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAPI = void 0;
const socket_1 = require("processes/socket");
const connectAPI = (url, position) => {
    const data = {
        event: 'connect',
        payload: {
            url,
            position,
        }
    };
    socket_1.WS.sendData(data);
};
exports.connectAPI = connectAPI;
