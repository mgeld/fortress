"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleGetAboutSectorAPI = void 0;
const socket_1 = require("processes/socket");
const battleGetAboutSectorAPI = (id, arena) => {
    const data = {
        event: 'battleGetAboutSector',
        payload: {
            id,
            arena
        }
    };
    socket_1.WS.sendData(data);
};
exports.battleGetAboutSectorAPI = battleGetAboutSectorAPI;
