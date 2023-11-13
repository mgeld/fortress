"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectorHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SectorHandler extends __1.Handler {
    handle(message) {
        events_1.sectorsAPI.events.setAboutSector(message.payload);
    }
}
exports.SectorHandler = SectorHandler;
SectorHandler.EVENT = 'sector';
