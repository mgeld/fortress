"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directAPI = void 0;
const socket_1 = require("processes/socket");
const directAPI = (position) => {
    const data = {
        event: 'direct',
        payload: {
            position,
        }
    };
    socket_1.WS.sendData(data);
};
exports.directAPI = directAPI;
