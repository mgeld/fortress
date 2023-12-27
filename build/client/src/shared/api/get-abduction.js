"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbductionAPI = void 0;
const socket_1 = require("processes/socket");
const getAbductionAPI = (zone_id, page) => {
    const data = {
        event: 'getAbduction',
        payload: {
            zone_id,
            page,
        }
    };
    socket_1.WS.sendData(data);
};
exports.getAbductionAPI = getAbductionAPI;
