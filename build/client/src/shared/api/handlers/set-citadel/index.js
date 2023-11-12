"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCitadelHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
class SetCitadelHandler extends __1.Handler {
    handle(message) {
        console.log('SetCitadelHandler handle');
        if (message.payload)
            events_1.citadelAPI.events.setCitadel(message.payload);
    }
}
exports.SetCitadelHandler = SetCitadelHandler;
SetCitadelHandler.EVENT = "set-citadel";
