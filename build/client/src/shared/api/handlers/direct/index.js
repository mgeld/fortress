"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectPointerHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class DirectPointerHandler extends __1.Handler {
    handle(message) {
        events_1.pointersAPI.events.updatePositionPointer(message.payload);
    }
}
exports.DirectPointerHandler = DirectPointerHandler;
DirectPointerHandler.EVENT = "direct";
