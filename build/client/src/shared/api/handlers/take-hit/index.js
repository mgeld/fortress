"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeHitHandler = void 0;
const events_1 = require("shared/api/events");
const __1 = require("..");
const snackbar_1 = require("shared/ui/snackbar");
let timeId;
class TakeHitHandler extends __1.Handler {
    handle(message) {
        const hit = message.payload.hit;
        events_1.sectorsAPI.events.setTakeFort(hit);
        switch (hit.status) {
            case 'defense':
                if (hit.defenders === 1) {
                }
                else
                    snackbar_1.snackbarModel.events.newToast({
                        text: 'На сектор добавлен новый защитник!',
                        t: 2
                    });
                break;
            case 'victory':
                if (hit.defenders === 0)
                    snackbar_1.snackbarModel.events.newToast({
                        text: 'Сектор захвачен!',
                        t: 1
                    });
                else
                    snackbar_1.snackbarModel.events.newToast({
                        text: 'Уничтожен страж форта!',
                        t: 3
                    });
                break;
            case 'defeat':
                snackbar_1.snackbarModel.events.newToast({
                    text: 'Ваш штурмовик уничтожен!',
                    t: 4
                });
                break;
        }
        if (timeId) {
            clearTimeout(timeId);
        }
        timeId = setTimeout(() => {
            events_1.sectorsAPI.events.setTakeFort(null);
        }, 6000);
    }
}
exports.TakeHitHandler = TakeHitHandler;
TakeHitHandler.EVENT = 'take-hit';
