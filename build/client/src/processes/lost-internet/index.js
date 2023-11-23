"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lostInternet = void 0;
const lock_screen_1 = require("shared/ui/lock-screen");
const popout_root_1 = require("shared/ui/popout-root");
const lostInternet = () => {
    popout_root_1.popoutModel.events.setPopout('lock-screen');
    lock_screen_1.lockModel.events.setLockScreen({
        action: {
            text: 'Обновить',
            _click: () => {
                popout_root_1.popoutModel.events.setPopout(null);
                setTimeout(() => {
                    if (window.navigator.onLine) {
                    }
                    else {
                        popout_root_1.popoutModel.events.setPopout('lock-screen');
                    }
                }, 300);
            }
        },
        alert: 'Соединение потеряно',
        message: 'Возникли проблемы с подключением к интернету'
    });
};
exports.lostInternet = lostInternet;
