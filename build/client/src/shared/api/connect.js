"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAPI = void 0;
const socket_1 = require("processes/socket");
const connectAPI = (url, name, icon, position) => {
    console.log('connectAPI url', url);
    console.log('connectAPI name', name);
    console.log('connectAPI icon', icon);
    const data = {
        event: 'connect',
        payload: {
            url,
            name,
            icon,
            position,
        }
    };
    socket_1.WS.sendData(data);
};
exports.connectAPI = connectAPI;
