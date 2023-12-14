"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointersHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class PointersHandler extends __1.Handler {
    handle(message) {
        events_1.pointersAPI.events.setPointers(message.payload.pointers);
    }
}
exports.PointersHandler = PointersHandler;
PointersHandler.EVENT = 'pointers';
