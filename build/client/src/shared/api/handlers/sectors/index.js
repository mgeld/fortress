"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorsHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SectorsHandler extends __1.Handler {
    handle(message) {
        console.log('SectorsHandler message', message);
        events_1.sectorsAPI.events.setSectors(message.payload);
    }
}
exports.SectorsHandler = SectorsHandler;
SectorsHandler.EVENT = 'sectors';
