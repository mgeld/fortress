"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionDestroyHandler = void 0;
const socket_close_1 = require("processes/socket/socket-close");
const __1 = require("..");
const lock_screen_1 = require("shared/ui/lock-screen");
const popout_root_1 = require("shared/ui/popout-root");
class SessionDestroyHandler extends __1.Handler {
    handle(message) {
        console.log('SessionDestroyHandler handle');
        popout_root_1.popoutModel.events.setPopout('lock-screen');
        lock_screen_1.lockModel.events.setLockScreen({
            action: {
                text: 'Подключиться',
                _click: () => {
                    popout_root_1.popoutModel.events.setPopout(null);
                    (0, socket_close_1.reSocketClose)();
                }
            },
            alert: 'Ошибка подключения',
            message: 'Вы подключились к игре с другого устройства или вкладки. Необходимо завершить другую сессию, чтобы начать играть на этом устройстве.'
        });
    }
}
exports.SessionDestroyHandler = SessionDestroyHandler;
SessionDestroyHandler.EVENT = 'session-destroy';
