"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSectorsAPI = void 0;
const socket_1 = require("processes/socket");
const getSectorsAPI = (position, userId) => {
    const data = {
        event: 'getSectors',
        payload: {
            position,
            userId,
        }
    };
    socket_1.WS.sendData(data);
};
exports.getSectorsAPI = getSectorsAPI;
