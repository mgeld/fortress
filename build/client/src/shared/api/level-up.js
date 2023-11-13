"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelUpAPI = void 0;
const socket_1 = require("processes/socket");
const levelUpAPI = (type) => {
    const data = {
        event: 'levelUp',
        payload: {
            type
        }
    };
    socket_1.WS.sendData(data);
};
exports.levelUpAPI = levelUpAPI;
