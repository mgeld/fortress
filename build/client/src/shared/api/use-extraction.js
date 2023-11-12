"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExtractionAPI = void 0;
const socket_1 = require("processes/socket");
const useExtractionAPI = (id, index) => {
    const data = {
        event: 'useExtraction',
        payload: {
            id,
            index,
        }
    };
    socket_1.WS.sendData(data);
};
exports.useExtractionAPI = useExtractionAPI;
