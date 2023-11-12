"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleFireAPI = void 0;
const socket_1 = require("processes/socket");
const battleFireAPI = (pos, to_pos, direction, hitPointer) => {
    const data = {
        event: 'battleFire',
        payload: {
            pos,
            to_pos,
            direction,
        }
    };
    if (hitPointer.userId) {
        data['payload']['hitPointer'] = hitPointer;
    }
    socket_1.WS.sendData(data);
};
exports.battleFireAPI = battleFireAPI;
