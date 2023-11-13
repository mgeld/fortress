"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutSectorAPI = void 0;
const socket_1 = require("processes/socket");
const getAboutSectorAPI = (id) => {
    const data = {
        event: 'getAboutSector',
        payload: {
            id
        }
    };
    socket_1.WS.sendData(data);
};
exports.getAboutSectorAPI = getAboutSectorAPI;
