"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSatelliteAPI = void 0;
const socket_1 = require("processes/socket");
const getSatelliteAPI = (position, zoneId) => {
    const data = {
        event: 'getSatellite',
        payload: {
            position,
            zoneId,
        }
    };
    socket_1.WS.sendData(data);
};
exports.getSatelliteAPI = getSatelliteAPI;
