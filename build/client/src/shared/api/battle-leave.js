"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleLeaveAPI = void 0;
const socket_1 = require("processes/socket");
const battleLeaveAPI = () => {
    const data = {
        event: 'battleLeave',
        payload: {}
    };
    socket_1.WS.sendData(data);
};
exports.battleLeaveAPI = battleLeaveAPI;
