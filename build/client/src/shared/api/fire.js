"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireAPI = void 0;
const socket_1 = require("processes/socket");
const fireAPI = (pos, toPos, direction, hitPointer) => {
    const data = {
        event: 'fire',
        payload: {
            pos,
            to_pos: toPos,
            direction
        }
    };
    if (hitPointer.userId) {
        data['payload']['hitPointer'] = hitPointer;
    }
    socket_1.WS.sendData(data);
};
exports.fireAPI = fireAPI;
