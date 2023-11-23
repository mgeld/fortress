"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCitadelHandler = void 0;
const __1 = require("..");
const events_1 = require("shared/api/events");
const tutorial_1 = require("shared/ui/tutorial");
class SetCitadelHandler extends __1.Handler {
    handle(message) {
        console.log('SetCitadelHandler handle');
        if (message.payload) {
            events_1.citadelAPI.events.setCitadel(message.payload);
            setTimeout(() => {
                tutorial_1.tutorialModel.events.setTutorial('projector');
            }, 2000);
        }
    }
}
exports.SetCitadelHandler = SetCitadelHandler;
SetCitadelHandler.EVENT = "set-citadel";
