"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beamAPI = void 0;
const socket_1 = require("processes/socket");
const beamAPI = (position, fort, sector) => {
    const data = {
        event: 'beam',
        payload: {
            position,
            fort,
            sector,
        }
    };
    socket_1.WS.sendData(data);
};
exports.beamAPI = beamAPI;
