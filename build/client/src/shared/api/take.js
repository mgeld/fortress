"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeAPI = void 0;
const socket_1 = require("processes/socket");
const takeAPI = (fort, sector) => {
    const data = {
        event: 'take',
        payload: {
            fort,
            sector,
        }
    };
    socket_1.WS.sendData(data);
};
exports.takeAPI = takeAPI;
