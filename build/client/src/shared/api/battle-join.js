"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleJoinAPI = void 0;
const socket_1 = require("processes/socket");
const battleJoinAPI = (battleId) => {
    const data = {
        event: 'battleJoin',
        payload: {}
    };
    if (battleId)
        data.payload.id = battleId;
    socket_1.WS.sendData(data);
};
exports.battleJoinAPI = battleJoinAPI;
