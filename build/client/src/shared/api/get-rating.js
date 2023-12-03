"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatingAPI = void 0;
const socket_1 = require("processes/socket");
const getRatingAPI = () => {
    console.log('getRatingAPI');
    const data = {
        event: 'getRating',
        payload: {}
    };
    socket_1.WS.sendData(data);
};
exports.getRatingAPI = getRatingAPI;
