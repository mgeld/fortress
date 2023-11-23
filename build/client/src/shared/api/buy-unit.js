"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyUnitAPI = void 0;
const socket_1 = require("processes/socket");
const buyUnitAPI = (id) => {
    const data = {
        event: 'buyUnit',
        payload: {
            id
        }
    };
    socket_1.WS.sendData(data);
};
exports.buyUnitAPI = buyUnitAPI;
