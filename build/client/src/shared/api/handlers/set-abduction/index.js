"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetAbductionHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SetAbductionHandler extends __1.Handler {
    handle(message) {
        const { zones } = message.payload;
        events_1.abductionAPI.events.setZones(zones);
    }
}
exports.SetAbductionHandler = SetAbductionHandler;
SetAbductionHandler.EVENT = "set-abduction";
