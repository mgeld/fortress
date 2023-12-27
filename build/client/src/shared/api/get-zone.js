"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZoneAPI = void 0;
const socket_1 = require("processes/socket");
const getZoneAPI = (id) => {
    const data = {
        event: 'getZone',
        payload: {
            id
        }
    };
    socket_1.WS.sendData(data);
};
exports.getZoneAPI = getZoneAPI;
