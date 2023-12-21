"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delExtractionAPI = void 0;
const socket_1 = require("processes/socket");
const delExtractionAPI = (id, index) => {
    const data = {
        event: 'delExtraction',
        payload: {
            id,
            index,
        }
    };
    socket_1.WS.sendData(data);
};
exports.delExtractionAPI = delExtractionAPI;
