"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editZoneAPI = void 0;
const socket_1 = require("processes/socket");
const editZoneAPI = (icon, name, description, color, hash) => {
    const data = {
        event: 'editZone',
        payload: {
            icon,
            name,
            description,
            color,
            hash
        }
    };
    socket_1.WS.sendData(data);
};
exports.editZoneAPI = editZoneAPI;
