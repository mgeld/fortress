"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindContHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
const snackbar_1 = require("shared/ui/snackbar");
let timeId;
class FindContHandler extends __1.Handler {
    handle(message) {
        events_1.projectorAPI.events.setContainer(message.payload);
        snackbar_1.snackbarModel.events.newToast({
            text: 'Найден контейнер!',
            t: 7
        });
        if (timeId) {
            clearTimeout(timeId);
        }
        timeId = setTimeout(() => {
            events_1.projectorAPI.events.setContainer(null);
        }, 9000);
    }
}
exports.FindContHandler = FindContHandler;
FindContHandler.EVENT = 'find-cont';
