"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAPI = void 0;
const socket_1 = require("processes/socket");
const getUserAPI = () => {
    const data = {
        event: 'getUser',
        payload: {}
    };
    socket_1.WS.sendData(data);
};
exports.getUserAPI = getUserAPI;
