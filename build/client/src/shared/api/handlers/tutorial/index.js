"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialHandler = void 0;
const __1 = require("..");
const tutorial_1 = require("shared/ui/tutorial");
class TutorialHandler extends __1.Handler {
    handle(message) {
        console.log('TutorialHandler handle');
        if (message.payload.type === 'hold') {
            setTimeout(() => {
                tutorial_1.tutorialModel.events.setTutorial('hold');
            }, 4000);
        }
        if (message.payload.type === 'ship') {
            setTimeout(() => {
                tutorial_1.tutorialModel.events.setTutorial('ship');
            }, 6000);
        }
    }
}
exports.TutorialHandler = TutorialHandler;
TutorialHandler.EVENT = "tutorial";
