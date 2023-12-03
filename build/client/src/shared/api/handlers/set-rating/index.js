"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRatingHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SetRatingHandler extends __1.Handler {
    handle(message) {
        console.log('SetRatingHandler handle');
        const { zones } = message.payload;
        console.log('SetRatingHandler zones', zones);
        events_1.ratingAPI.events.setZones(zones);
    }
}
exports.SetRatingHandler = SetRatingHandler;
SetRatingHandler.EVENT = "set-rating";
