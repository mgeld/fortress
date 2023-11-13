"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleDirectAPI = void 0;
const socket_1 = require("processes/socket");
const battleDirectAPI = (position) => {
    const data = {
        event: 'battleDirect',
        payload: {
            position,
        }
    };
    socket_1.WS.sendData(data);
};
exports.battleDirectAPI = battleDirectAPI;
