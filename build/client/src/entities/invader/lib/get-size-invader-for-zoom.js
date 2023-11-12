"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSizeInvaderForZoom = void 0;
const getSizeInvaderForZoom = (zoom) => {
    switch (true) {
        case zoom === 15:
            return 18;
        case zoom === 16:
            return 36;
        default:
            return 0;
    }
};
exports.getSizeInvaderForZoom = getSizeInvaderForZoom;
