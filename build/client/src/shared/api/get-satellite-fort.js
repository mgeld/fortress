"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSatelliteFortAPI = void 0;
const socket_1 = require("processes/socket");
const getSatelliteFortAPI = (position) => {
    const data = {
        event: 'getSatelliteFort',
        payload: {
            position
        }
    };
    socket_1.WS.sendData(data);
};
exports.getSatelliteFortAPI = getSatelliteFortAPI;
