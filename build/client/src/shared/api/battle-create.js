"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleCreateAPI = void 0;
const socket_1 = require("processes/socket");
const battleCreateAPI = () => {
    const data = {
        event: 'battleCreate',
        payload: {}
    };
    socket_1.WS.sendData(data);
};
exports.battleCreateAPI = battleCreateAPI;
