"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelPointerHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class DelPointerHandler extends __1.Handler {
    handle(message) {
        var _a;
        console.log('DelPointerHandler userId', (_a = message.payload) === null || _a === void 0 ? void 0 : _a.userId);
        events_1.pointersAPI.events.delPointer(message.payload);
    }
}
exports.DelPointerHandler = DelPointerHandler;
DelPointerHandler.EVENT = "del-pointer";
