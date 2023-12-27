"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetZoneHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SetZoneHandler extends __1.Handler {
    handle(message) {
        console.log('SetZoneHandler');
        events_1.ratingAPI.events.selectRatingZone(message.payload);
    }
}
exports.SetZoneHandler = SetZoneHandler;
SetZoneHandler.EVENT = "set-zone";
