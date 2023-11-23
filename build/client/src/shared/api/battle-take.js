"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleTakeAPI = void 0;
const socket_1 = require("processes/socket");
const battleTakeAPI = (fort, sector) => {
    const data = {
        event: 'battleTake',
        payload: {
            fort,
            sector,
        }
    };
    socket_1.WS.sendData(data);
};
exports.battleTakeAPI = battleTakeAPI;
